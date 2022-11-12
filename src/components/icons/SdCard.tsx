import React from "react";

function SdCard({ color, size }: { color?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="icon icon-tabler icon-tabler-device-sd-card"
      widths={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
    >
      <path stroke="none" d="M0 0h24v24H0z"></path>
      <path d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2h-6.172a2 2 0 00-1.414.586L5.586 7.414A2 2 0 005 8.828V19a2 2 0 002 2zM13 6v2M16 6v2M10 7v1"></path>
    </svg>
  );
}

export default React.memo(SdCard);
