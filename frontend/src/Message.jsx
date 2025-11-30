import React from "react";
import unknownIcon from './assets/unknown_icon.png';
import axios from "axios";

export default function Message({ id, nick, avatar, message, createdAt, msgStyle, onClick }) {
  const [extend, setExtend] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const backend = import.meta.env.VITE_BACKEND;

  const handleDescription = async () => {
    try {
      setLoading(true);
      
      const res = await axios.get(`${backend}/readDescMessage/${id}`);
      const description = res.data[0]?.description;
      setDescription(description || "Опис відсутній");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setDescription("Помилка завантаження опису");
      setLoading(false);
    }
  };

  const toggleExtend = () => {
    setExtend(prev => !prev);
    if (!extend && description === "") {
      handleDescription();
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`flex space-x-4 p-3 bg-rose-500 rounded-md shadow-md max-w-md ${msgStyle}`}
    >
      <img
        src={avatar || unknownIcon}
        alt={`${nick} avatar`}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-white pr-3">{nick}</span>
          <span className="text-xs text-gray-200">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>

        <p className="text-white">{message}</p>
        
        <button onClick={(e)=>{e.stopPropagation(); toggleExtend()}} className="text-sm underline text-white mt-1">
          Показати {extend ? "менше" : "більше"}
        </button>

        {extend && (
          <p className="text-white mt-2">
            {loading ? "Завантаження опису…" : description}
          </p>
        )}
      </div>
    </div>
  );
}
