import { memo } from "react";

function Info({ className, color }: { className?: string; color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      x="0"
      y="0"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 38 38"
      xmlSpace="preserve"
      className={className ? className : ""}
      fill={color ? color : "#000"}
    >
      <path d="M19 2c9.374 0 17 7.626 17 17 0 8.304-6.011 15.3-14 16.725V33.7c6.847-1.391 12-7.443 12-14.7 0-8.284-6.716-15-15-15S4 10.716 4 19s6.716 15 15 15c.338 0 .668-.028 1-.05V36h-1C9.626 36 2 28.374 2 19S9.626 2 19 2zm-1 26h2V16h-4v2h2v10zm0-16h2v-2h-2v2z"></path>
    </svg>
  );
}

export default memo(Info);
