import { useState } from "react";
import {useNavigate} from "react-router-dom"
import parseToken from "./parceToken.js";
import axios from "axios";

export default function Writter() {
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const backend = import.meta.env.VITE_BACKEND;

    const isAuth = !!localStorage.getItem("token");

    if (!isAuth) {
        return (
            <div className="fixed bottom-0 text-center left-0 w-full p-4">
                <p className="mb-2">Ви не авторизовані.</p>
                <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 bg-blue-600 text-white"
                >
                    Перейти до авторизації
                </button>
            </div>
        );
    }

    const sendMessage = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
        alert("User not authorized");
        return; 
    }

    const tokenData = parseToken(token);
    if (!tokenData) {
        alert("Invalid token");
        return;
    }
    if (message.trim() === "") {
        alert("Назва тема не повинна бути порожньою");
        setLoading(false);
        return;
    }

  try {
    const res = await axios.post(`${backend}/writeMessage`, {
      uuid: tokenData.id, 
      message: message,
      description: description
    });
    window.location.reload()
    setLoading(false);
  } catch (err) {
    console.error(err);
    alert("Error connecting to server");
    setLoading(false);
  }
};


    return (
        <div className="flex flex-row items-center space-x-2 p-4 fixed bottom-0 left-0 w-full shadow bg-indigo-300">
            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={()=>{localStorage.removeItem("token"); window.location.reload(true);}}
            >
                Вийти
            </button>
            <textarea
                className="border p-2 rounded focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {if (e.key === "Enter") {sendMessage();}}}
                placeholder="Тема..."
                
            />
            <textarea
                className="flex-1 border p-2 rounded focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => {if (e.key === "Enter") {sendMessage();}}}
                placeholder="Опис..."
                
            />

            <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={sendMessage}
                disabled={loading}
            >
                Відправити
            </button>
        </div>
    );
}
