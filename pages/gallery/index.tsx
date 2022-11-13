import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
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

  return (
    <div className="gallery flex w-screen h-screen overflow-hidden bg-gray-50">
      <h1>{tCommon("bikes gallery")}</h1>
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
