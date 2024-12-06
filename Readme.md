# **LiveStock Tracker**

A simple app to track real-time stock data and visualize historical trends.

---

## **Features**

- Live stock price updates via WebSockets
- Search stocks by ticker symbols
- Historical data visualization (1 Day, 1 Week, 1 Month, 1 Year)
- Custom chart integration using Recharts
- Responsive design with Tailwind CSS

---

## **Tech Stack**

- **Frontend**: React, Tailwind CSS, Recharts
- **Backend**: Node.js, Express, Socket.IO
- **API**: Polygon.io, Finnhub.io

---

## **Getting Started**

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or later)
- npm or yarn

---

### Installation

#### Clone the Repository

```bash
git clone https://github.com/yourusername/livestock-tracker.git
cd livestock-tracker
```

#### Install the dependencies

##### Frontend

```bash
cd client
npm install
```

##### Backend

```bash
cd server
npm install
```

### Running the application

#### Start the frontend

```bash
npm start
```

#### Start the backend

```bash
node index.js
```

---

## **Usage**

### Steps to Use the Application

- **Search Stocks**:
  - Input `AAPL` in the search bar to view data for Apple Inc.
- **View Historical Trends**:
  - Select `1 Month` to analyze Apple’s stock trends over the last 30 days.
- **Real-Time Data**:
  - Observe live updates as new stock data arrives every 10 second.
