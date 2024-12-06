import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { mockHistoricalData } from "../constants/MockValues";
import { convertUnixTimestampToDate } from "../helpers/data-helpers";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartConfig } from "../constants/config";
import { ChartFilter } from "./ChartFilter";
import { StockContext } from "../context/StockContext";
import { fetchHistoricalData } from "../api/stock-api";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

export const Chart = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState(mockHistoricalData.results);
  const [filter, setFilter] = useState("week");
  const { stockSymbol } = useContext(StockContext);
  const multiplier = 100;
  const handleClick = () => {
    if (isDisabled) return;
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 12000);
  };
  const formatData = () => {
    return data.map((item) => {
      return {
        value: item.c,
        date: convertUnixTimestampToDate(item.t),
      };
    });
  };

  useEffect(() => {
    const getDateRange = () => {
      const now = new Date();
      let fromDate = new Date();

      switch (filter) {
        case "day":
          fromDate.setDate(now.getDate() - 1);
          break;
        case "week":
          fromDate.setDate(now.getDate() - 7);
          break;
        case "month":
          fromDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          fromDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          fromDate.setDate(now.getDate() - 1);
      }
      return {
        from: fromDate.toISOString().split("T")[0],
        to: now.toISOString().split("T")[0],
      };
    };

    const updateChartData = async () => {
      try {
        const { from, to } = getDateRange();
        const resolution = filter;
        const result = await fetchHistoricalData(
          stockSymbol,
          multiplier,
          resolution,
          from,
          to
        );
        setData(result);
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="absolute lg:right-5 right-1 flex text-xs gap-5 z-30">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                handleClick();
                setFilter(item);
              }}
              isDisabled={isDisabled}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={formatData(data)} className="lg:p-8 p-2">
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="#7e3f98

                "
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#7e3f98

"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type={"monotone"}
            dataKey={"value"}
            stroke={"#312e81"}
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          <Tooltip />
          <XAxis dataKey={"date"} />
          <YAxis domain={["datamin", "datamax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
