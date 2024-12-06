import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export const ChartFilter = ({ text, active, onClick, isDisabled }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`border p-1 rounded-sm hover:bg-indigo-600 
      ${isDisabled ? "bg-[#333] cursor-not-allowed" : "pointer"}
      ${
        darkMode
          ? "text-gray-300 border-gray-600"
          : "text-gray-500 border-gray-400 hover:text-white"
      } ${active ? "bg-indigo-600 text-white" : "bg-transparent"}
        `}
    >
      {text}
    </button>
  );
};
