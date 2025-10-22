import { Handle, Position } from "@xyflow/react";
import getStatusDetails from "../hooks/getStatusDetails";

// Simple styles for the node
const llmCallNodeStyle = {
  width: 180,
  height: 80,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #f6ad55", // Orange border
  borderRadius: "8px",
  backgroundColor: "#fff",
  padding: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const statusStyle = {
  fontSize: "12px",
  fontWeight: "bold",
  marginTop: "5px",
};

const LLMCallNode = ({ data }) => {
  const { label, status } = data;
  const { statusText, statusColor } = getStatusDetails(status);
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={llmCallNodeStyle}>
        <div>{label}</div>
        <div style={{ ...statusStyle, color: statusColor }}>{statusText}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default LLMCallNode;
