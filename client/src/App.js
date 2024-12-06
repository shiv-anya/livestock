import React, { useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { ThemeContext } from "./context/themeContext";
import { StockContext } from "./context/StockContext";
import { Navbar } from "./components/Navbar";

const App = () => {
  const [darkMode, setDarkMode] = useState("true");
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Navbar />
        <Dashboard />
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
