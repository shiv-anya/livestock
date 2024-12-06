import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

export const searchSymbol = async (query) => {
  try {
    const response = await fetch(
      `http://localhost:3001/symbols?ticker=${query}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

export const fetchStockDetails = async (stockSymbol) => {
  try {
    const response = await fetch(
      `http://localhost:3001/symbols/${stockSymbol}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

export const fetchQuote = async (stockSymbol) => {
  try {
    const response = await fetch(
      `http://localhost:3001/quote?ticker=${stockSymbol}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

export const fetchBatchQuotes = (tickers) => {
  socket.emit("fetch_batch_quotes", tickers);
};

export const fetchHistoricalData = async (
  stockSymbol,
  multiplier,
  resolution,
  from,
  to
) => {
  try {
    const response = await fetch(
      `http://localhost:3001/history?stockSymbol=${stockSymbol}&multiplier=${multiplier}&resolution=${resolution}&from=${from}&to=${to}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};
