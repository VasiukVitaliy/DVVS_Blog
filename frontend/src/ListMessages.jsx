import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import axios from "axios";
import Message from "./Message";
import parseToken from "./parceToken";

export default function ListMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
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

  let uuid = null;
  if (localStorage.getItem("token")) {
    uuid = parseToken(localStorage.getItem("token")).id;
  }


  return (
    <div className="flex flex-col space-y-3 p-4 pb-[100px]">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">Повідомлень немає</p>
      ) : (
        messages.map((msg, index) => (
          <Message
            key={index}
            onClick={() => {
              if (uuid === msg.uuid) {
                setSelectedMsg(msg);
                setSelectedId(msg.id);
              }
            }}
            msgStyle={!uuid || uuid !== msg.uuid ? "self-start" : "self-end"}
            nick={msg.nick}
            avatar={msg.avatar}
            message={msg.message}
            createdAt={msg.created_at}
          />
        ))
      )}

      {selectedMsg && (
        <EditModal msg={selectedMsg} id = {selectedId} uuid={uuid} onClose={() => setSelectedMsg(null)} />
      )}
    </div>
  );
}
