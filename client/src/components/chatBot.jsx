import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "🚦 Welcome! I can help you with traffic rules, road signs, driving licenses, vehicle documents, and road safety.",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;
    setMessage("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/chat",
        {
          message: currentMessage,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Unable to connect to the traffic assistant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full bg-blue-600 text-white shadow-xl hover:scale-105 transition-all text-2xl"
      >
        🚦
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-22 right-5 z-50 w-[380px] h-[450px] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden">

          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">
                Traffic Rule Assistant
              </h3>
              <p className="text-xs opacity-80">
                Ask anything about traffic laws & road safety
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-xl hover:text-red-200"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-3 ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-wrap text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border shadow-sm text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start mb-3">
                <div className="bg-white border shadow-sm px-4 py-3 rounded-2xl text-sm">
                  Typing...
                </div>
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div className="border-t bg-white p-3 flex gap-2">
            <input
              type="text"
              value={message}
              placeholder="Ask a traffic rule question..."
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
              className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 text-white px-5 rounded-xl hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
