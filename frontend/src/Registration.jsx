import axios from "axios";
import { useState} from "react";

import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [nick, setNick] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const backend = import.meta.env.VITE_BACKEND;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!nick || !login || !password) {
      alert("Заповніть всі поля");
      return;
    }

    const formData = new FormData();
    formData.append("nick", nick);
    formData.append("login", login);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);
try {
  const res = await axios.post(`${backend}/reg`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  if (res.data.authenticate) {
    alert("Реєстрація успішна!");
    setNick("");
    setLogin("");
    setPassword("");
    setAvatar(null);
    localStorage.setItem("token", res.data.token)
    setLoading(false)
    navigate("/");
  } else {
    alert("Помилка: " + res.data.message);
  }
;
  
  } catch (err) {
    console.error(err);
    alert("Помилка при відправці: " + (err.response?.data?.message || err.message));
    setLoading(false);
  }
}
  

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center">Реєстрація</h2>

      <div>
        <label className="block mb-1 font-semibold">Нік</label>
        <input
          type="text"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

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

      <div>
        <label className="block mb-1 font-semibold">Аватар</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        Зареєструватися
      </button>
    </form>
  );
}
