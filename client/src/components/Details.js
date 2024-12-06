import React, { useContext } from "react";
import Card from "./Card";
import { ThemeContext } from "../context/themeContext";

export const Details = ({ details }) => {
  const { darkMode } = useContext(ThemeContext);
  const detailsItem = {
    name: "Name",
    country: "Country",
    currency: "Currency",
    exchange: "Primary Exchange",
    ipo: "IPO",
    marketCapitalization: "Market Capitalization",
    finnhubIndustry: "SIC Description",
  };
  const convertMillionToBillion = (number) => (number / 1000).toFixed(2);
  return (
    <Card>
      <ul
        className={`${
          darkMode ? "text-white" : "text-gray-900"
        } h-full flex flex-col font-thin`}
      >
        {Object.keys(detailsItem).map((item) => (
          <li
            key={item}
            className={`text-xs flex-1 flex justify-between py-3 border-b border-b ${
              darkMode ? "border-gray-600" : "border-gray-400"
            }`}
          >
            <span className="capitalize">{detailsItem[item]}</span>
            <span className="uppercase">
              {item === "marketCapitalization"
                ? convertMillionToBillion(details[item])
                : details[item]}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
