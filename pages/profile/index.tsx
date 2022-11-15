import { camelCase } from "lodash";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { atom } from "recoil";
import { User } from "../../src/types/User";

const ProfilePage = ({
  accessToken,
  user,
}: {
  accessToken: string;
  user: User;
}) => {
  console.log({ accessToken, user });

  const router = useRouter();
  const id = camelCase(user.id);

  // TODO: Direct user to appropriate dashboard according to Role
  router.push(`/profile/${id}`);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  let accessToken = req.cookies["next-auth.session-token"];
  console.log("Profile serversideprops");
  if (!accessToken) {
    console.log("No access token found in cookies");
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

  try {
    console.log("Verifying access token:", { accessToken });
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

export default ProfilePage;
