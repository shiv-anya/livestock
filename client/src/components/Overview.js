import React, { useContext } from "react";
import Card from "./Card";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { ThemeContext } from "../context/themeContext";

export const Overview = ({
  symbol,
  price,
  change,
  changePercent,
  currency,
}) => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <Card>
      <span
        className={`absolute top-5 left-5 font-thin text-xs lg:text-white md:text-white text-transparent`}
      >
        {symbol}
      </span>
      <div className="flex h-full w-full justify-center items-center gap-8">
        <div className="flex gap-2 items-center">
          <span className="lg:text-2xl md:text-xl text-base">${price}</span>
          <span
            className={`text-xs font-thin uppercase ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            ({currency})
          </span>
        </div>
        <div
          className={`${
            change > 0 ? "text-green-500" : "text-red-500"
          } flex gap-1 items-center`}
        >
          {change > 0 ? <IoIosArrowUp /> : <IoIosArrowDown />}
          <p>
            <span className="text-base">{changePercent}%</span>
            <span className="text-xs font-thin ml-1">({change})</span>
          </p>
        </div>
      </div>
    </Card>
  );
};
