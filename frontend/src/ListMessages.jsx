import React, { useEffect, useState } from "react";
import axios from "axios";
import Message from "./Message";

export default function ListMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const backend = import.meta.env.VITE_BACKEND;

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${backend}/readAll`); 
      setMessages(res.data); 
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p className="text-center mt-4">Завантаження повідомлень...</p>;

  return (
    
    <div className="flex flex-col space-y-3 p-4">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">Повідомлень немає</p>
      ) : (
        messages.map((msg, index) => (
          <Message
            key={index}
            nick={msg.nick}
            avatar={msg.avatar}
            message={msg.message}
            createdAt={msg.created_at}
          />
        ))
      )}
    </div>
  );
}
