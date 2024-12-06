import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { fetchBatchQuotes } from "../api/stock-api";
import Marquee from "react-fast-marquee";
import { io } from "socket.io-client";
import { mockBatchQuotes } from "../constants/MockValues";
const socket = io("http://localhost:3001");

const tickers = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "META",
  "NVDA",
  "NFLX",
];

export const Navbar = () => {
  const [data, setData] = useState(mockBatchQuotes);
  useEffect(() => {
    const updateBatchQuotes = async () => {
      try {
        const results = fetchBatchQuotes(tickers);
        socket.on("receive_batch_quotes", (data) => setData(data));
      } catch (e) {
        setData({});
      }
    };
    const interval = setInterval(updateBatchQuotes, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <nav className="lg:h-[16vh] md:h-[10vh] h-[9vh] bg-[#222] border-b border-gray-600">
      <Marquee pauseOnHover={true}>
        <ul className="flex h-full lg:text-base md:text-sm text-sm">
          {data.map((item) => (
            <li
              className="lg:w-[300px] md:w-[150px] flex flex-col border-r border-gray-600 lg:p-5 md:p-2 p-2"
              key={item.name}
            >
              <div className="flex justify-between">
                <p>{item.name}</p>
                <p>{item.pc}</p>
              </div>
              <div
                className={`flex gap-2 items-center ${
                  item.d < 0 ? "text-red-500" : "text-green-600"
                }`}
              >
                <IoIosArrowDown />
                <span className="flex gap-1 items-baseline">
                  <span>{item.dp}%</span>
                  <span className="text-xs">({item.d})</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Marquee>
    </nav>
  );
};
