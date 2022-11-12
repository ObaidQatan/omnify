import Image from "next/image";
import { DOMAttributes } from "react";

const MenuItem = ({
  className,
  children,
  style,
  onClick,
  props,
}: {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
  onClick?: DOMAttributes<HTMLDivElement>["onClick"];
  props?: any;
}) => {
  return (
    <div
      className={`option flex items-center px-2 cursor-pointer py-3 tracking-wider mx-2 ${
        className ? className : ""
      }`}
      onMouseOver={(e) => {
        e.currentTarget.children[0].classList.add("translate-x-1");
      }}
      onMouseOut={(e) => {
        e.currentTarget.children[0].classList.remove("translate-x-1");
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MenuItem;
