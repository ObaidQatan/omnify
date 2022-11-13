import Image from "next/image";

const Logo_White = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <div
      className={`relative overflow-hidden ${
        size && `w-[${size}px] h-[${size}px]`
      } ${className && className}`}
    >
      <Image
        src="/img/other/logo-white.png"
        alt="logo"
        layout="fill"
        objectFit="fill"
      />
    </div>
  );
};

export default Logo_White;
