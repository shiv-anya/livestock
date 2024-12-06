import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Card = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div
      className={`lg:p-8 md:p-5 p-2 ${
        darkMode
          ? "bg-transparent border-gray-600 text-white"
          : "bg-white border-gray-400 text-gray-900"
      } rounded-md h-full w-full border relative`}
    >
      {children}
    </div>
  );
};

export default Card;
