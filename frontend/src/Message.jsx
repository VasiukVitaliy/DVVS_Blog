import React from "react";
import unknownIcon from './assets/unknown_icon.png';

export default function Message({ nick, avatar, message, createdAt , msgStyle, onClick}) {

  return (
    <div onClick={onClick}
    className={`flex space-x-4 p-3 bg-rose-500 rounded-md shadow-md max-w-md ${msgStyle}`}>
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
      </div>
      
    </div>
  );
}
