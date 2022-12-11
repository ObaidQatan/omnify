import { SimpleGrid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { camelCase, capitalize, startCase } from "lodash";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { supabase } from "../../db/storage-connector";
import Background_2 from "../../src/components/common/Background_2";
import ImageUploader from "../../src/components/common/ImageUploader";
import Loading, { loadingState } from "../../src/components/common/Loading";
import Logo_White from "../../src/components/common/Logo/White";

const Home: NextPage = () => {
  const { t: tCommon } = useTranslation("common");
  const [_, setLoading] = useRecoilState(loadingState);
  const router = useRouter();

  const [canUploadAvatar, setCanUploadAvatar] = useState<boolean>(false);
  const [avatarUploadDialogOpened, setAvatarUploadDialogOpened] =
    useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const onRegisterClick = () => {
    if (!username || !password || !confirmPassword) {
      return showNotification({
        title: tCommon("error"),
        message: startCase(tCommon(camelCase("All fields are required"))),
        color: "red",
      });
    }

    if (password !== confirmPassword) {
      return showNotification({
        title: tCommon("error"),
        message: startCase(tCommon(camelCase("Passwords do not match"))),
        color: "red",
      });
    }

    setLoading(true);
    console.log("Save form....");
    // TODO: get values from refs

    createUser();
  };

  const createUser = async (avatar?: string) => {
    console.log("Create user....");
    console.log({
      data: {
        username,
        password,
        confirmPassword,
        avatarFile,
      },
    });

    fetch(`/api/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
          confirmPassword,
        },
      }),
    }).then((res) => {
      if (res.ok) {
        showNotification({
          title: tCommon("success"),
          message: capitalize(tCommon(camelCase("profile created"))),
          color: "green",
        });

        setLoading(false);
        res.json().then((data) => {
          console.log("User created....", { data });
          // setUserID(data.user.id);

          if (avatarFile) {
            uploadAvatar(data.user.id).then(() => {
              document.cookie = `next-auth.session-token=${data.user.accessToken}; path=/;`;
              router.push("/gallery");
            });
          } else {
            document.cookie = `next-auth.session-token=${data.user.accessToken}; path=/;`;
            router.push("/gallery");
          }
        });
      } else {
        setLoading(false);
        showNotification({
          title: tCommon("error"),
          message: capitalize(
            startCase(tCommon(camelCase("profile create failed")))
          ),
          color: "red",
        });

        res.json().then((data) => {
          console.log("Error creating profile....", {
            res: res.statusText,
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

  const uploadAvatar = async (userID: string) => {
    console.log("Upload avatar file....");

    supabase.storage
      .from("users-data")
      .upload(`public/avatars/${userID}.png`, avatarFile!, {
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
      });
  };

  const onUploadAvatar = () => {
    setAvatarUploadDialogOpened(true);
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center px-5">
      <Background_2 className="" />
      <Loading />

      <div className="register bg-white shadow-md w-full h-[500px] max-w-[1100px] overflow-y-auto shadow-black rounded-md p-5 flex flex-col items-center">
        <div className="logo w-full flex justify-start items-center">
          <Logo_White className="rounded-full shadow shadow-gray-500 h-[80px] w-[80px]" />
          <h1 className="text-gray-400 mx-5">
            {startCase(tCommon("register"))}
          </h1>
        </div>

        <hr className="my-5 w-full" />

        <SimpleGrid
          className="container w-full"
          cols={2}
          breakpoints={[{ maxWidth: 700, cols: 1 }]}
        >
          <div className="inputs flex flex-col items-start justify-start w-full flex-1">
            <input
              type="text"
              name="username"
              placeholder={startCase(tCommon(camelCase("username")))}
              spellCheck={false}
              onChange={(e) => {
                setUsername(e.target?.value?.trim());
              }}
              className="outline-none focus:outline-dashed text-red-500 font-[Nunito] focus:outline-red-500 my-2 p-5 bg-white rounded-md w-full shadow-inner shadow-gray-400"
            />
            <input
              type="password"
              name="password"
              placeholder={startCase(tCommon(camelCase("password")))}
              spellCheck={false}
              onChange={(e) => {
                setPassword(e.target?.value?.trim());
              }}
              className="outline-none text-red-500 font-[Nunito] focus:outline-dashed focus:outline-red-500 my-2 p-5 bg-white rounded-md w-full shadow-inner shadow-gray-400"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder={startCase(tCommon(camelCase("confirm password")))}
              spellCheck={false}
              onChange={(e) => {
                setConfirmPassword(e.target?.value?.trim());
              }}
              className="outline-none text-red-500 font-[Nunito] focus:outline-dashed focus:outline-red-500 my-2 p-5 bg-white rounded-md w-full shadow-inner shadow-gray-400"
            />
          </div>

          <div className="photo-uploader flex-[0.5] flex flex-col items-center">
            {avatarUploadDialogOpened && (
              <ImageUploader
                setShow={setAvatarUploadDialogOpened}
                fileSetter={setAvatarFile}
              />
            )}
            <div
              className="avatar text-red-500 text-center cursor-pointer relative h-[120px] w-[120px] bg-slate-100 rounded-full overflow-hidden border-[#7267f023] border-[2px]"
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
                  src={"/img/other/avatar.svg"}
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
        </SimpleGrid>

        <div className="buttons flex flex-col items-center justify-center w-full">
          <button
            className="my-2 p-5 bg-red-500 text-white font-[Nunito] tracking-wider rounded-md w-full shadow shadow-gray-400"
            onClick={onRegisterClick}
          >
            {startCase(tCommon(camelCase("register")))}
          </button>

          <Link href={"/"}>
            <a className="text-red-500 font-bold border-b border-dashed border-red-300 font-[Monteserrat] text-sm tracking-wider p-2 rounded-md hover:bg-red-500 hover:bg-opacity-5">
              {capitalize(
                startCase(tCommon(camelCase("already have an account")))
              )}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
