"use client";

import {
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  ReactFlow,
} from "@xyflow/react";
import React, { useCallback, useState } from "react";
import "@xyflow/react/dist/style.css";
import ChatInputNode from "./ChatInputNode";
import LLMCallNode from "./LLMCallNode";
import UpdateDBNode from "./UpdateDBNode";

// Define node types
const nodeTypes = {
  chatInput: ChatInputNode,
  llmCall: LLMCallNode,
  updateDB: UpdateDBNode,
};

const initialNodes = [
  {
    id: "1",
    type: "chatInput",
    position: { x: 100, y: 100 },
    data: { label: "Chat Input" },
  },
  {
    id: "2",
    type: "llmCall",
    position: { x: 400, y: 100 },
    data: { label: "LLM Call", status: "idle" },
    // inital status idle
  },
  {
    id: "3",
    type: "updateDB",
    position: { x: 70, y: 100 },
    data: { label: "Update DB", status: "idle" },
    // initial status idle
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
  },
];

const WorkflowEditor = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isProcessing, setIsProcessing] = useState(false); // State to prevent multiple simultaneous runs

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  // Update node status (e.g., processing, saved)
  const updateNodeStatus = useCallback(
    (nodeId, status) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                status,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Handle the message submission from the ChatInputNode
  const handleSendMessage = useCallback(
    async (message) => {
      if (isProcessing) return; // Prevent running again if already processing
      setIsProcessing(true);

      // Reset node statuses before starting
      updateNodeStatus("2", "idle");
      updateNodeStatus("3", "idle");

      try {
        // The ChatInput node itself handles the input, we just proceed the flow here.
        // Call LLM
        updateNodeStatus("2", "processing"); // Update LLM node status
        const llmResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BE_URL}/llm/process`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
          }
        );

        if (!llmResponse.ok) {
          throw new Error(
            `LLM API call failed: ${llmResponse.status} ${llmResponse.statusText}`
          );
        }

        const llmData = await llmResponse.json();
        const aiResponse = llmData.response;
        updateNodeStatus("2", "done"); // Update LLM node status after receiving response

        //Save to DB
        updateNodeStatus("3", "saving"); // Update DB node status
        const saveResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BE_URL}/db/save`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_message: message,
              ai_response: aiResponse,
            }),
          }
        );

        if (!saveResponse.ok) {
          throw new Error(
            `DB save API call failed: ${saveResponse.status} ${saveResponse.statusText}`
          );
        }

        updateNodeStatus("3", "saved"); // Update DB node status after saving
      } catch (error) {
        console.error("Error during workflow execution:", error);
        // Optionally update node status to reflect error
        if (error.message.includes("LLM")) {
          updateNodeStatus("2", "error");
        } else if (error.message.includes("DB")) {
          updateNodeStatus("3", "error");
        }
        // You might want to show an error message to the user here
        alert(`An error occurred during the workflow: ${error.message}`);
      } finally {
        setIsProcessing(false); // Reset processing state
      }
    },
    [isProcessing, updateNodeStatus]
  );

  // Callback for connecting nodes (not strictly necessary for this fixed flow, but good practice)
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodesWithHandler = nodes.map((node) => {
    if (node.type === "chatInput") {
      return {
        ...node,
        data: {
          ...node.data,
          onSendMessage: handleSendMessage,
        },
      };
    }
    return node;
  });

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlow
        nodes={nodesWithHandler}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
        nodeTypes={nodeTypes}
        onConnect={onConnect}
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
