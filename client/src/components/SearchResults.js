import React, { useContext } from "react";
import { StockContext } from "../context/StockContext";

export const SearchResults = ({ results, onClick }) => {
  const { setStockSymbol } = useContext(StockContext);
  return (
    <ul className="absolute top-9 bg-white text-gray-500 w-full max-h-64 p-2 rounded-md border-2 border-neutral-300 overflow-y-scroll z-10">
      {results.map((item) => (
        <li
          key={item.symbol + item.type}
          className="p-2 border-b border-neutral-300 flex justify-between rounded-md hover:bg-indigo-200"
          onClick={() => {
            setStockSymbol(item.symbol);
            onClick();
          }}
        >
          <span>{item.symbol}</span> <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
};
