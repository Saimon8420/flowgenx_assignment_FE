import { Handle, Position } from "@xyflow/react";

// Simple styles for the node
const updateDBNodeStyle = {
  width: 180,
  height: 80,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #48bb78",
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

const UpdateDBNode = ({ data }) => {
  const { status, label } = data;
  // Determine status text and color based on state
  let statusText = "";
  let statusColor = "#333";
  if (status === "saving") {
    statusText = "Saving...";
    statusColor = "#f6ad55"; // Orange
  } else if (status === "saved") {
    statusText = "Saved";
    statusColor = "#48bb78"; // Green
  } else if (status === "error") {
    statusText = "Error";
    statusColor = "#e53e3e"; // Red
  } else {
    // idle
    statusText = "Idle";
    statusColor = "#a0aec0"; // Grey
  }
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={updateDBNodeStyle}>
        <div>{label}</div>
        <div style={{ ...statusStyle, color: statusColor }}>{statusText}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default UpdateDBNode;
