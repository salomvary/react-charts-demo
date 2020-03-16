import React from "react";
import "./App.css";
import LineChart from "./LineChart";

const data = [
  { day: new Date("2020-01-06"), price: 299.799988 },
  { day: new Date("2020-01-07"), price: 298.390015 },
  { day: new Date("2020-01-08"), price: 303.190002 },
  { day: new Date("2020-01-09"), price: 309.630005 },
  { day: new Date("2020-01-10"), price: 310.329987 },
  { day: new Date("2020-01-13"), price: 316.959991 },
  { day: new Date("2020-01-14"), price: 312.679993 },
  { day: new Date("2020-01-15"), price: 311.339996 },
  { day: new Date("2020-01-16"), price: 315.23999 },
  { day: new Date("2020-01-17"), price: 318.730011 }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LineChart width={600} height={200} data={data} />
        <p>
          <a href="https://salomvary.com/react-charts.html">Blog post</a>{' '}|{' '}
          <a href="https://github.com/salomvary/react-charts-demo">Git repo</a>
        </p>
      </header>
    </div>
  );
}

export default App;
