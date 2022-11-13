import Image from "next/image";

const Background_3 = ({ className }: { className?: string }) => {
  return (
    <div className={`background_1 ${className && className}`}>
      <Image
        src="/img/other/bg (1).jpg"
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
};

export default Background_3;
