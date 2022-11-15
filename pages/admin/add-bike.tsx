import { showNotification } from "@mantine/notifications";
import { camelCase, capitalize, lowerCase, startCase } from "lodash";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { supabase } from "../../db/storage-connector";
import BikeImageUploader from "../../src/components/common/BikeImageUploader";
import Header from "../../src/components/common/Header";
import Loading, { loadingState } from "../../src/components/common/Loading";
import { User } from "../../src/types/User";
import generateUniqueId from "../../src/util/generateUniqueId";

interface Props {
  accessToken?: string;
  user?: User;
}

const AddBike = (props: Props) => {
  const { t: tCommon } = useTranslation("common");
  const router = useRouter();
  const [loading, setLoading] = useRecoilState(loadingState);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [canUploadAvatar, setCanUploadAvatar] = useState<boolean>(false);
  const [avatarUploadDialogOpened, setAvatarUploadDialogOpened] =
    useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const onUploadAvatar = () => {
    setAvatarUploadDialogOpened(true);
  };

  const onSubmit = () => {
    if (!name) {
      return showNotification({
        title: tCommon("error"),
        message: startCase(tCommon(camelCase("Bike name is required"))),
        color: "red",
      });
    }

    setLoading(true);
    console.log("Save form....");
    // TODO: get values from refs

    upload();
  };

  const upload = () => {
    setLoading(true);
    console.log("Create bike....");
    console.log({
      data: {
        name,
        description,
        avatarFile,
      },
    });

    if (avatarFile) {
      console.log("Upload avatar file....");
      const id = generateUniqueId();

      supabase.storage
        .from("bikes-data")
        .upload(`public/images/${id}.png`, avatarFile!, {
          upsert: true,
          cacheControl: "3600",
          contentType: "image/png",
        })
        .then((res) => {
          if (res.error) {
            console.log("Error uploading avatar file....", {
              error: res.error,
            });

            setLoading(false);
            return showNotification({
              title: tCommon("error"),
              message: res.error.message,
              color: "red",
            });
          }

          console.log("Avatar file uploaded....", { path: res.data.path });

          // TODO: create bike
          createBike(
            `https://xjhrfldvdasjxazqxgox.supabase.co/storage/v1/object/public/bikes-data/public/images/${id}.png`
          );
        });
    } else {
      createBike();
    }
  };

  const createBike = async (imageUrl?: string) => {
    fetch(`/api/bikes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.accessToken}`,
      },
      body: JSON.stringify({
        bike: {
          name,
          description,
          image: imageUrl,
        },
      }),
    }).then((bike_res) => {
      if (bike_res.ok) {
        showNotification({
          title: tCommon("success"),
          message: capitalize(tCommon(camelCase("bike created"))),
          color: "green",
        });

        setLoading(false);
        bike_res.json().then((data) => {
          console.log("Bike created....", { data });
          // setUserID(data.bike.id);

          router.reload();
        });
      } else {
        setLoading(false);
        showNotification({
          title: tCommon("error"),
          message: capitalize(
            startCase(tCommon(camelCase("bike create failed")))
          ),
          color: "red",
        });

        bike_res.json().then((data) => {
          console.log("Error creating bike....", {
            res: bike_res.statusText,
            data,
          });
          showNotification({
            title: tCommon("error"),
            message:
              typeof data.error === "string" ? data.error : data.error.message,
            color: "red",
          });
        });
      }
    });
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col items-center justify-start">
      <Header user={props.user} />
      <Loading />
      <div className="add-bike bg-white shadow shadow-gray-400 rounded-mf p-5 w-full h-full max-w-[1800px] flex flex-col items-center justify-start">
        <div className="form w-full flex flex-col items-start justify-start max-w-[500px] mx-5">
          {/** create inputs for name, image */}
          <input
            type="text"
            name="name"
            placeholder={startCase(tCommon(camelCase("bike name")))}
            spellCheck={false}
            onChange={(e) => {
              setName(e.target?.value?.trim());
            }}
            className="outline-none text-red-500 font-[Nunito] focus:outline-dashed focus:outline-red-500 my-2 p-5 bg-white rounded-md w-full shadow-inner shadow-gray-400"
          />

          <input
            type="text"
            name="description"
            placeholder={startCase(tCommon(camelCase("bike description")))}
            spellCheck={false}
            onChange={(e) => {
              setDescription(e.target?.value?.trim());
            }}
            className="outline-none text-red-500 font-[Nunito] focus:outline-dashed focus:outline-red-500 my-2 p-5 bg-white rounded-md w-full shadow-inner shadow-gray-400"
          />
        </div>

        <div className="photo-uploader max-w-[500px] mx-5 flex flex-col items-center outline-none text-red-500 font-[Nunito] focus:outline-dashed focus:outline-red-500 my-2 p-5 bg-white rounded-md w-full shadow-inner shadow-gray-400">
          {avatarUploadDialogOpened && (
            <BikeImageUploader
              setShow={setAvatarUploadDialogOpened}
              fileSetter={setAvatarFile}
            />
          )}
          <div
            className="avatar text-red-500 text-center cursor-pointer relative h-[200px] w-[200px] max-h-full max-w-full bg-slate-100 rounded-md overflow-hidden border-[#7267f023] border-[2px]"
            onMouseOver={() => setCanUploadAvatar(true)}
            onMouseLeave={() => setCanUploadAvatar(false)}
          >
            {avatarFile ? (
              <Image
                src={URL.createObjectURL(avatarFile)}
                alt="avatar"
                layout="fill"
                objectFit="fill"
              />
            ) : (
              <Image
                src={"/img/other/bike.svg"}
                alt={"avatar"}
                layout="fill"
                objectFit="fill"
              />
            )}
            {canUploadAvatar && (
              <div
                className="absolute top-0 left-0 w-full h-full bg-red-500 bg-opacity-50 flex justify-center items-center"
                onClick={onUploadAvatar}
              >
                <div className="text-white text-[12px] text-center tracking-wider font-bold py-2 px-5 rounded-full my-5">
                  {startCase(tCommon(camelCase("upload avatar")))}
                </div>
              </div>
            )}
          </div>
          <h3
            className="my-5 p-5 rounded-md border-dashed border-2 text-gray-500 border-gray-400 cursor-pointer"
            onMouseOver={() => setCanUploadAvatar(true)}
            onMouseLeave={() => setCanUploadAvatar(false)}
            onClick={onUploadAvatar}
          >
            {startCase(tCommon(camelCase("upload avatar")))}
          </h3>
        </div>

        <button
          className="submit-btn w-full bg-red-500 text-white font-[Nunito] hover:bg-red-700 p-2 rounded-md max-w-[500px] m-5 shadow shadow-gray-400"
          onClick={onSubmit}
        >
          {startCase(tCommon(camelCase("submit")))}
        </button>
      </div>
    </div>
  );
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
      if (lowerCase(data.user?.role) !== "admin") {
        throw "User is not an admin";
      }

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

export default AddBike;
