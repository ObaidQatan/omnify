import { SimpleGrid } from "@mantine/core";
import { camelCase, capitalize, lowerCase, startCase, upperCase } from "lodash";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Golf, Logout } from "tabler-icons-react";
import { loadingState } from "../../../src/components/common/Loading";
import BikeImage from "../../../src/components/gallery/BikeImage";
import { User } from "../../../src/types/User";

import dayjs from "dayjs";

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
    <div className="profile w-screen h-screen flex items-center justify-center bg-gray-100 py-5">
      <div className="wrapper flex flex-col items-center justify-center w-[300px] mx-5 h-full">
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
      <div className="subs flex-1 h-full max-h-[670px] m-5 p-5 flex flex-col items-center justify-start bg-white shadow shadow-gray-400 rounded-md">
        {!user?.subscriptions || user?.subscriptions?.length === 0 ? (
          <div className="msg w-full h-full flex justify-center items-center">
            <h3>
              {capitalize(
                startCase(
                  tCommon(
                    camelCase("your subscriptions will be displayed here")
                  )
                )
              )}
            </h3>
          </div>
        ) : (
          <SimpleGrid
            cols={3}
            breakpoints={[
              { maxWidth: 768, cols: 1 },
              { maxWidth: 1024, cols: 2 },
            ]}
            className="subs-grid w-full h-full"
          >
            {user?.subscriptions?.map((sub) => (
              <div
                key={sub.id}
                className="sub relative flex flex-col items-center justify-start rounded-lg shadow shadow-[#00000030] p-3 h-[250px] hover:-translate-y-2 border border-transparent hover:border-red-400 hover:shadow-lg cursor-pointer "
              >
                <div className="sub-type absolute top-2 right-2 bg-red-500 text-white text-start p-1 rounded-full text-[10px] font-bold z-10 ring ring-red-200">
                  {upperCase(startCase(tCommon(camelCase(sub?.plan?.type)))) ||
                    startCase(tCommon(camelCase("unknown")))}
                </div>

                {sub?.bike && sub?.bike?.image ? (
                  <div className="img h-[150px] w-[150px] max-h-full max-w-full relative rounded-lg overflow-hidden">
                    <Image
                      src={sub?.bike?.image}
                      alt="Bike"
                      layout="fill"
                      objectFit="fill"
                    />
                  </div>
                ) : (
                  <div className="image h-[150px] w-[150px] m-2 rounded-md overflow-hidden">
                    <BikeImage />
                  </div>
                )}
                <div className="name text-start w-full text-sm font-bold border-b mb-1">
                  {sub?.bike?.name || startCase(tCommon(camelCase("no name")))}
                </div>
                <div className=" text-start w-full text-[11px] font-[Monteserrat] break-words ">
                  <strong>{startCase(tCommon(camelCase("from")))} : </strong>
                  {sub?.createdAt
                    ? dayjs(sub?.createdAt).format("DD MMM YYYY")
                    : startCase(tCommon(camelCase("uknown")))}
                </div>
                <div className=" text-start w-full text-[11px] font-[Monteserrat] break-words ">
                  <strong>{startCase(tCommon(camelCase("expiry")))} : </strong>
                  {sub?.endDate
                    ? dayjs(sub?.endDate).format("DD MMM YYYY")
                    : startCase(tCommon(camelCase("uknown")))}
                </div>
              </div>
            ))}
          </SimpleGrid>
        )}
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
