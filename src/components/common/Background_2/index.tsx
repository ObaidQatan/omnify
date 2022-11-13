import Image from "next/image";

const Background_2 = ({ className }: { className?: string }) => {
  return (
    <div className={`background_1 ${className && className}`}>
      <Image
        src="/img/other/bg (2).jpg"
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
};

export default Background_2;
