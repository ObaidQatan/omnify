import { showNotification } from "@mantine/notifications";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Header from "../../src/components/common/Header";
import Menu from "../../src/components/common/Header/Menu";
import Loading, { loadingState } from "../../src/components/common/Loading";
import { Bike } from "../../src/types/Bike";
import { User } from "../../src/types/User";

const Gallery = ({
  accessToken,
  user,
}: {
  accessToken: string;
  user: User;
}) => {
  const router = useRouter();
  const { t: tCommon } = useTranslation("common");
  const [_, setLoading] = useRecoilState(loadingState);

  const [bikes, setBikes] = useState<Bike[]>([]);

  useEffect(() => {
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/bikes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          setLoading(false);

          return showNotification({
            title: "Error",
            message: "Error updating bikes",
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
            console.log({ bikes: data.bikes });
            return setBikes(data.bikes);
          }
        });
      })
      .catch((e) => {
        console.log(e);
        return showNotification({
          title: "Error",
          message: e,
          color: "red",
        });
      });
  }, []);

  return (
    <div className="gallery flex flex-col w-screen h-screen overflow-hidden bg-gray-50">
      <Loading />
      {/** Build header */}
      <Header />
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
        redirect: {
          destination: "/",
          permanent: false,
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
        },
      };
    }

    return {
      props: {
        accessToken,
        user: null,
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

export default Gallery;
