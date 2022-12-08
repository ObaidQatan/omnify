import { Button, SimpleGrid } from "@mantine/core";
import { startCase } from "lodash";
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
      className={`p-5 flex-1 overflow-y-auto`}
    >
      {props.bikes.map((bike) => (
        <div
          key={bike.id}
          className={`bg-white p-5 rounded-md shadow shadow-gray-400 flex flex-col items-center justify-start`}
        >
          {/* =============== Image ============= */}
          {bike.image ? (
            <div className="img h-[200px] w-[200px] max-h-full max-w-full relative ">
              <Image
                src={bike.image}
                alt="Bike"
                layout="fill"
                objectFit="fill"
              />
            </div>
          ) : (
            <div className="image w-full m-2 rounded-md overflow-hidden">
              <BikeImage />
            </div>
          )}
          {/* ==================================== */}

          {/* =============== Name ============= */}
          <div className="name text-start text-lg font-semibold text-gray-700 mt-2 px-2 w-full border-b">
            {bike.name}
          </div>
          {/* ==================================== */}

          {/* =============== View Button ============= */}
          <div className="view-button mt-2 w-full text-end">
            <Button
              className="btn w-full"
              onClick={() => router.push(`/gallery/bike/${bike.id}`)}
            >
              <h4
                className="tracking-wider"
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                {startCase(tCommon("view"))}
              </h4>
            </Button>
          </div>
        </div>
      ))}
    </SimpleGrid>
  );
};

export default Gallery;
