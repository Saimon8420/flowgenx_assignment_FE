const getLLMStatusDetails = (status) => {
  // Determine status text and color based on state
  let statusText = "";
  let statusColor = "#333";
  if (status === "processing") {
    statusText = "Processing...";
    statusColor = "#f6ad55"; // Orange
  } else if (status === "done") {
    statusText = "Done";
    statusColor = "#48bb78"; // Green
  } else if (status === "error") {
    statusText = "Error";
    statusColor = "#e53e3e"; // Red
  } else {
    // idle
    statusText = "Idle";
    statusColor = "#a0aec0"; // Grey
  }

  return { statusText, statusColor };
};

export default getLLMStatusDetails;
