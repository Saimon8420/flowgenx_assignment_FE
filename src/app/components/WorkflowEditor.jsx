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

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;
