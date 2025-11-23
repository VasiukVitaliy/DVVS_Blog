import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND;

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!login || !password) {
    alert("Заповніть логін та пароль");
    return;
  }

  try {
    const res = await axios.post(`${backend}/login`, { login, password });

    const data = res.data;

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      alert(data.message || "Помилка логіну");
    }
  } catch (err) {
    console.error(err);
    alert("Помилка при підключенні до сервера");
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Логін</h2>

      <div>
        <label className="block mb-1 font-semibold">Логін</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Увійти
      </button>
    </form>
  );
}
