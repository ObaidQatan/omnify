import { showNotification } from "@mantine/notifications";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "../../../../src/components/common/Loading";
import BikeImage from "../../../../src/components/gallery/BikeImage";
import { Bike } from "../../../../src/types/Bike";
import { User } from "../../../../src/types/User";

const Bike = ({
  accessToken,
  user,
  id,
}: {
  accessToken: string;
  user: User;
  id: string;
}) => {
  const router = useRouter();
  const { t: tCommon } = useTranslation("common");
  const [loading, setLoading] = useRecoilState(loadingState);
  const [bike, setBike] = useState<Bike | undefined>();

  useEffect(() => {
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/bikes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setLoading(false);

          return showNotification({
            title: "Error",
            message: "Error updating bike",
            color: "red",
          });
        }

        res.json().then((data) => {
          if (data.error) {
            console.log(data.error);
            setLoading(false);

            return showNotification({
              title: "Error",
              message: data.error,
              color: "red",
            });
          } else {
            showNotification({
              title: "Success",
              message: "Bikes fetched successfully",
              color: "green",
            });

            setLoading(false);
            console.log({ bike: data.bike });
            return setBike(data.bike);
          }
        });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        return showNotification({
          title: "Error",
          message: e,
          color: "red",
        });
      });
  }, []);

  return (
    <div className="profile w-screen h-screen flex flex-col items-center justify-center bg-gray-100 py-5">
      <div className="wrapper bg-white flex flex-col items-center justify-start w-full max-w-[800px] h-full shadow-md shadow-[#00000050] rounded-lg p-5">
        {bike?.image ? (
          <div className="img h-[200px] w-[200px] max-h-full max-w-full relative ">
            <Image src={bike.image} alt="Bike" layout="fill" objectFit="fill" />
          </div>
        ) : (
          <div className="image w-full m-2 rounded-md overflow-hidden">
            <BikeImage />
          </div>
        )}
        <div className="name text-center text-lg font-semibold text-gray-700 mt-2 px-2 w-full border-b">
          {bike?.name}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  let accessToken = req.cookies["next-auth.session-token"];
  if (!accessToken) {
    accessToken = context.query?.accessToken as string;
    if (!accessToken) {
      return {
        props: {
          accessToken: null,
          user: null,
          id: context.params?.id,
        },
      };
    }
  }

  console.log("Access token from profile [id] sever side props:", {
    accessToken,
  });

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/auth/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await result.json();
    console.log({ data });

    if (data.error) {
      throw data.error;
    }

    if (data.valid) {
      return {
        props: {
          accessToken,
          user: data.user,
          id: context.params?.id,
        },
      };
    }

    return {
      props: {
        accessToken,
        user: null,
        id: context.params?.id,
      },
    };
  } catch (error) {
    console.log({ error });

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default Bike;
