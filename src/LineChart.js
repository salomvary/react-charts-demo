import React from "react";

const padding = 40;

export default function LineChart({
  data,
  width: outerWidth,
  height: outerHeight
}) {
  // Calculate the extent of the data
  // (not the most efficient way but easily readable)
  const minDay = Math.min(...data.map(({ day }) => day));
  const maxDay = Math.max(...data.map(({ day }) => day));
  const minPrice = Math.min(...data.map(({ price }) => price));
  const maxPrice = Math.max(...data.map(({ price }) => price));

  // Accommodate for the room around the coordinate system
  const width = outerWidth - 2 * padding;
  const height = outerHeight - 2 * padding;

  // Create the horizontal and vertical scale functions
  const x = day => width * ((day - minDay) / (maxDay - minDay));
  const y = price =>
    height - height * ((price - minPrice) / (maxPrice - minPrice));

  // Calculate ticks for y axis labels
  const ticksCount = 5;
  const yTicks = [
    ...range(
      Math.floor(minPrice),
      Math.ceil(maxPrice),
      Math.round((Math.ceil(maxPrice) - Math.floor(minPrice)) / ticksCount)
    )
  ];

  return (
    <svg
      width={outerWidth}
      height={outerHeight}
      fill="greenyellow"
      stroke="greenyellow"
      fontSize="10px"
      viewBox={`0 0 ${outerWidth} ${outerHeight}`}
    >
      {/* Move down and right to leave room for labels */}
      <g transform={translate(padding, padding)}>
        <Circles data={data} x={x} y={y} />
        <Line data={data} x={x} y={y} />
      </g>
      <XAxis
        data={data}
        x={x}
        transform={translate(padding, outerHeight - padding / 2)}
      />
      <YAxis
        values={yTicks}
        y={y}
        transform={translate(padding / 2, padding)}
      />
    </svg>
  );
}

const Circles = ({ data, x, y }) => (
  <g>
    {data.map(({ day, price }) => (
      <circle key={day} cx={x(day)} cy={y(price)} r="4" />
    ))}
  </g>
);

const Line = ({ data, x, y }) => (
  <g>
    <path
      strokeWidth="2"
      fill="none"
      d={line(
        data.map(({ day, price }) => ({
          x: x(day),
          y: y(price)
        }))
      )}
    />
  </g>
);

const XAxis = ({ data, x, ...props }) => (
  <g {...props}>
    {data.map(({ day }) => (
      <text key={day} x={x(day)} textAnchor="middle">
        {formatDate(day)}
      </text>
    ))}
  </g>
);

const YAxis = ({ values, y, ...props }) => (
  <g {...props}>
    {values.map((price, i) => (
      <text key={i} y={y(price)} textAnchor="middle">
        {price}
      </text>
    ))}
  </g>
);

// Returns a string like M1,2L3,4L5,6
const line = data => "M" + data.map(({ x, y }) => x + "," + y).join("L");

// Create SVG translate functions in a readable way
const translate = (x, y) => `translate(${x}, ${y})`;

// Return short date like "Jan 10"
const formatDate = day =>
  day.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC"
  });

// Generate numeric values within a range
function* range(min, max, step) {
  for (let i = min; i < max; i += step) {
    yield i;
  }
}
