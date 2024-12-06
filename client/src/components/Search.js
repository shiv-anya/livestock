import React, { useContext, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { SearchResults } from "./SearchResults";
import { ThemeContext } from "../context/themeContext";
import { searchSymbol } from "../api/stock-api";

export const Search = () => {
  const { darkMode } = useContext(ThemeContext);
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState([]);
  const clear = () => {
    setInput("");
  };
  const closeSearchResults = () => setBestMatches([]);
  const updateBestMatches = async () => {
    try {
      if (input) {
        const query = input.trim().toUpperCase();
        const results = await searchSymbol(query);
        const data = results.result;
        setBestMatches(data);
      }
    } catch (e) {
      setBestMatches([]);
    }
    clear();
  };
  return (
    <div
      className={`text-xs lg:text-base md:text-base border rounded-md flex relative w-3/5 ml-2 justify-between z-50 ${
        darkMode ? "border-gray-600" : "border-gray-400"
      }`}
    >
      <input
        className={`outline-none px-2 text-sm w-full ${
          darkMode ? "bg-transparent text-gray-300" : "bg-white text-gray-900"
        }`}
        type="text"
        value={input}
        placeholder="Search Stocks..."
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") updateBestMatches();
        }}
      />
      <button
        className="bg-indigo-600 p-2 rounded-md"
        onClick={updateBestMatches}
      >
        <IoIosSearch />
      </button>
      {bestMatches.length > 0 && (
        <SearchResults results={bestMatches} onClick={closeSearchResults} />
      )}
    </div>
  );
};
