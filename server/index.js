const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
const server = http.createServer(app);

const poly_base_url = "https://api.polygon.io";
const finn_base_url = "https://finnhub.io/api/v1";
const poly_api_key = process.env.POLY_API_KEY;
const finn_api_key = process.env.FINN_API_KEY;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/symbols", async (req, res) => {
  const { ticker } = req.query;
  const url = `${finn_base_url}/search?q=${ticker}&exchange=US&token=${finn_api_key}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(201).json(data);
});

app.get("/symbols/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const url = `${finn_base_url}/stock/profile2?symbol=${ticker}&token=${finn_api_key}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(201).json(data);
});

app.get("/quote", async (req, res) => {
  const { ticker } = req.query;
  const url = `${finn_base_url}/quote?symbol=${ticker}&token=${finn_api_key}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(201).json(data);
});

app.get("/history", async (req, res) => {
  const { stockSymbol, multiplier, resolution, from, to } = req.query;
  const url = `${poly_base_url}/v2/aggs/ticker/${stockSymbol}/range/${multiplier}/minute/${from}/${to}?apiKey=${poly_api_key}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(201).json(data);
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("fetch_batch_quotes", async (tickers) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const results = [];
    for (const ticker of tickers) {
      const response = await fetch(
        `${finn_base_url}/quote?symbol=${ticker}&token=${finn_api_key}`
      );
      const data = await response.json();
      results.push({ ...data, name: ticker });
      await sleep(1000);
    }
    socket.broadcast.emit("receive_batch_quotes", results);
  });
});

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:3001");
});
