"use client";
import { useState } from "react";
import WorkflowEditor from "./components/WorkflowEditor";

export default function Home() {
  const [messages, setMessages] = useState([]);

  // Function to add a new message pair (user + AI) to the display
  const addMessage = (userMessage, aiResponse) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + "-user", text: userMessage, sender: "user" },
      { id: Date.now() + "-ai", text: aiResponse, sender: "ai" },
    ]);
  };
  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.sender === "user" ? "user-message" : "ai-message"
            }`}
          >
            <strong>{msg.sender === "user" ? "You: " : "AI: "}</strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>

      <div className="w-full h-full">
        <WorkflowEditor onMessageReceived={addMessage} />
      </div>
    </div>
  );
}
