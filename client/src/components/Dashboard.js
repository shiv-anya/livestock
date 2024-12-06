import React, { useContext, useEffect, useState } from "react";
import { Header } from "./Header";
import { Details } from "./Details";
import { Overview } from "./Overview";
import { Chart } from "./Chart";
import { ThemeContext } from "../context/themeContext";
import { StockContext } from "../context/StockContext";
import { fetchQuote, fetchStockDetails } from "../api/stock-api";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

export const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);

  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const results = await fetchStockDetails(stockSymbol);
        setStockDetails(results);
      } catch (e) {
        setStockDetails({});
      }
    };
    const updateStockOverview = async () => {
      try {
        const results = await fetchQuote(stockSymbol);
        setQuote(results);
      } catch (e) {
        setQuote({});
      }
    };
    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);
  return (
    <section
      className={`lg:h-[120vh] md:h-[220vh] h-[120vh] ${
        darkMode ? "bg-dark" : "bg-[#f3f3f3]"
      }`}
    >
      <article className="h-[85vh] py-10">
        <Header name={stockSymbol} />
        <div className="w-full flex gap-2 p-8 h-screen md:flex-row flex-col">
          <div className="w-full lg:w-3/5 h-full">
            <Chart />
          </div>
          <div className="lg:w-2/5 w-full flex flex-col gap-2 h-full">
            <Overview
              symbol={stockSymbol}
              change={quote.d}
              price={quote.pc}
              changePercent={quote.dp}
              currency={stockDetails.currency}
            />
            <Details details={stockDetails} />
          </div>
        </div>
      </article>
    </section>
  );
};
