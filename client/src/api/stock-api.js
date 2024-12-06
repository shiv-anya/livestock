import { io } from "socket.io-client";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_BACKEND_URL;

const socket = io(`${BASE_URL}`);

export const searchSymbol = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/symbols?ticker=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

export const fetchStockDetails = async (stockSymbol) => {
  try {
    const response = await fetch(`${BASE_URL}/symbols/${stockSymbol}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

export const fetchQuote = async (stockSymbol) => {
  try {
    const response = await fetch(`${BASE_URL}/quote?ticker=${stockSymbol}`);
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
      `${BASE_URL}/history?stockSymbol=${stockSymbol}&multiplier=${multiplier}&resolution=${resolution}&from=${from}&to=${to}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};
