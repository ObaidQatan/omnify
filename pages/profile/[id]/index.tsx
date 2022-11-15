import { camelCase, capitalize, lowerCase, startCase } from "lodash";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Golf, Logout } from "tabler-icons-react";
import { loadingState } from "../../../src/components/common/Loading";
import { User } from "../../../src/types/User";

const Profile = ({
  accessToken,
  user,
}: {
  accessToken: string;
  user: User;
}) => {
  const router = useRouter();
  const { t: tCommon } = useTranslation("common");
  const [loading, setLoading] = useRecoilState(loadingState);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://xjhrfldvdasjxazqxgox.supabase.co/storage/v1/object/public/users-data/public/avatars/${user.id}.png`
    )
      .then((res) => {
        console.log("Avatar file....", { res });
        if (res.ok) {
          setAvatarUrl(res.url);
        } else {
          setAvatarUrl(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error getting avatar file....", { err });
        setLoading(false);
      });
  }, []);

  return (
    <div className="profile w-screen h-screen flex flex-col items-center justify-center bg-gray-100 py-5">
      <div className="wrapper flex flex-col items-center justify-center w-[300px] h-full">
        <div className="profile-container w-full h-[500px] p-5 flex flex-col items-center justify-start bg-white shadow shadow-gray-400 rounded-md">
          {/** avatar then username */}
          <div className="avatar-container flex items-center justify-center w-full mb-5 pb-5 border-b">
            <div className="avatar relative w-20 h-20 rounded-full border-red-300 bg-red-300 border-[3px] overflow-hidden">
              <Image
                src={avatarUrl || "/img/other/avatar.svg"}
                alt="avatar"
                layout="fill"
                objectFit="fill"
              />
            </div>
          </div>

          <div className="username bg-red-500 my-2 text-white shadow-inner shadow-red-800 rounded-md p-2 flex flex-row items-center justify-start w-full">
            {lowerCase(startCase(tCommon(camelCase("username"))))}:
            <div className="px-2 font-semibold tracking-wider">
              {user.username}
            </div>
          </div>

          <div className="msg bg-red-500 my-2 text-white shadow-inner shadow-red-800 rounded-md p-2 flex flex-row items-center justify-start w-full">
            <div className="px-2 tracking-wider">
              {capitalize(
                startCase(
                  tCommon(
                    camelCase("other user information can be displayed here.")
                  )
                )
              )}
            </div>
          </div>
        </div>

        <button
          className="gallery-btn w-full flex items-center justify-center bg-red-500 hover:bg-red-600 py-5 my-5 text-white font-[Nunito] rounded-md shadow shadow-gray-400"
          onClick={() => router.push("/gallery")}
        >
          <Golf strokeWidth={1.5} />
          <h3 className="px-5">
            {startCase(tCommon(camelCase("open gallery")))}
          </h3>
        </button>

        <button
          className="logout-btn w-full flex items-center justify-center bg-white hover:bg-slate-100 py-5 text-red-500 font-[Nunito] font-bold rounded-md shadow shadow-gray-400"
          onClick={() => router.push("/logout")}
        >
          <Logout color="#e47777" />
          <h3 className="px-5">{startCase(tCommon(camelCase("logout")))}</h3>
        </button>
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

export default Profile;
