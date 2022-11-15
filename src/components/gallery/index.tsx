import { SimpleGrid } from "@mantine/core";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { Bike } from "../../types/Bike";
import { User } from "../../types/User";
import { loadingState } from "../common/Loading";
import BikeImage from "./BikeImage";

interface Props {
  bikes: Bike[];
  user?: User;
}
const Gallery = (props: Props) => {
  const { t: tCommon } = useTranslation("common");
  const router = useRouter();
  const [loading, setLoading] = useRecoilState(loadingState);

  return (
    <SimpleGrid
      cols={5}
      spacing="md"
      breakpoints={[
        { maxWidth: 600, cols: 1 },
        { maxWidth: 900, cols: 2 },
        { maxWidth: 1200, cols: 3 },
        { maxWidth: 1800, cols: 4 },
      ]}
    >
      {props.bikes.map((bike) => (
        <div
          key={bike.id}
          className={`bg-white p-5 rounded-md shadow shadow-gray-400 flex flex-col items-center justify-start`}
          onClick={() => router.push(`/gallery/bike/${bike.id}`)}
        >
          {bike.image ? (
            <div className="image w-full m-2 rounded-md overflow-hidden relative">
              <Image
                src="/img/other.bike.svg"
                alt="Bike"
                layout="fill"
                objectFit="fill"
              />
            </div>
          ) : (
            <BikeImage />
          )}
        </div>
      ))}
    </SimpleGrid>
  );
};

export default Gallery;
