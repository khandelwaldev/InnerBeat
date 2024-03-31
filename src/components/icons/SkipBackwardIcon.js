import * as React from "react";
const SkipBackwardIcon = ({ size, color, props }) => (
  <svg
    fill={color}
    width={size}
    height={size}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path d="M56 32a8 8 0 0 1 8 8v73.735l119.657-73.124A16 16 0 0 1 208 54.265v147.47a16.004 16.004 0 0 1-24.344 13.653L64 142.264V216a8 8 0 0 1-16 0V40a8 8 0 0 1 8-8Z" />
  </svg>
);
export default SkipBackwardIcon;
