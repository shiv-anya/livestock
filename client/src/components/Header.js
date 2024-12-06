import React, { useContext } from "react";
import { Search } from "./Search";
import { mockCompanyDetails } from "../constants/MockValues";
import { FaMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import { ThemeContext } from "../context/themeContext";

export const Header = ({ name }) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  return (
    <div className="flex justify-between p-2 items-center px-8">
      <div className="flex lg:gap-5 md:gap-2 gap-1 items-center w-full">
        <h2
          className={`text-xs lg:text-base md:text-base ${
            darkMode ? "text-white" : "text-black"
          } text-xl font-light`}
        >
          {name}
        </h2>
        <Search />
      </div>
      <button
        className={`lg:text-lg text-base border p-2 rounded-md hover:scale-110 ${
          darkMode ? "border-gray-600" : "border-gray-400"
        }`}
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <FaMoon className="text-yellow-500" />
        ) : (
          <MdOutlineWbSunny className="text-yellow-600" />
        )}
      </button>
    </div>
  );
};
