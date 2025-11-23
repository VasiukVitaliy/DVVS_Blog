import { useState } from "react";
import {useNavigate} from "react-router-dom"
import parseToken from "./parceToken.js";
import axios from "axios";

export default function Writter() {
    const [message, setMessage] = useState("");
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

  try {
    const res = await axios.post(`${backend}/writeMessage`, {
      uuid: tokenData.id, 
      message: message
    });

    alert(res.data)
  } catch (err) {
    console.error(err);
    alert("Error connecting to server");
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
            <input
                className="flex-1 border p-2 rounded"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Повідомлення..."
            />

            <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={sendMessage}
            >
                Відправити
            </button>
        </div>
    );
}
