import Image from "next/image";

const Background_2 = ({ className }: { className?: string }) => {
  return (
    <div className={`background_2 z-[-1] ${className && className}`}>
      <Image
        src="/img/other/bg (2).jpg"
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        quality={50}
      />
      <div className="absolute top-0 left-0 backdrop-blur-md h-full w-full"></div>
    </div>
  );
};

export default Background_2;
