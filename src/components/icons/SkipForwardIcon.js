import * as React from "react";
const SkipForwardIcon = ({ size, color, props }) => (
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
    <path d="M208 40v176a8 8 0 0 1-16 0v-73.736L72.344 215.388A16 16 0 0 1 48 201.735V54.265A16 16 0 0 1 72.343 40.61L192 113.735V40a8 8 0 0 1 16 0Z" />
  </svg>
);
export default SkipForwardIcon;
