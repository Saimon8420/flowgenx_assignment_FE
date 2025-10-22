import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

// Simple styles for the node (can be external CSS too)
const chatInputNodeStyle = {
  width: 200,
  height: 120,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #667eea", // Blue border
  borderRadius: "8px",
  backgroundColor: "#fff",
  padding: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const inputStyle = {
  width: "100%",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle = {
  padding: "5px",
  backgroundColor: "#667eea",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const ChatInputNode = ({ data }) => {
  // Receive onSendMessage prop from data
  const { label } = data;
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setInputValue("");
    }
  };
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={chatInputNodeStyle}>
        <label htmlFor="chat-input-node">{label}</label>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            id="chat-input-node"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type message..."
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Send
          </button>
        </form>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default ChatInputNode;
