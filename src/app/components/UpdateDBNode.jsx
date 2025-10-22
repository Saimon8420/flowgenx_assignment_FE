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

import getStatusDetails from "../hooks/getStatusDetails";

const UpdateDBNode = ({ data }) => {
  const { status, label } = data;
  const { statusText, statusColor } = getStatusDetails(status);

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
