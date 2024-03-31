import * as React from "react";
const DotsVerticalIcon = ({ size, color, props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M12 12h.01M12 6h.01M12 18h.01m.99-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0-12a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default DotsVerticalIcon;
