import Image from "next/image";

const BikeImage = () => {
  return (
    <div className="bg-gray-200 w-full h-full flex justify-center items-center p-5">
      <div className="img h-[200px] max-h-full relative ">
        <Image
          src="/img/other.bike.svg"
          alt="Bike"
          layout="fill"
          objectFit="fill"
        />
      </div>
    </div>
  );
};

export default BikeImage;
