import { showNotification } from "@mantine/notifications";
import { camelCase, capitalize, startCase } from "lodash";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Background_1 from "../src/components/common/Background_1";
import Loading, { loadingState } from "../src/components/common/Loading";
import Logo_White from "../src/components/common/Logo/White";
import { SOMETHING_WENT_WRONG } from "../src/errors";

const Home: NextPage = () => {
  const { t: tCommon } = useTranslation("common");
  const [_, setLoading] = useRecoilState(loadingState);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);

    console.log({ username, password });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, remmember: false }),
      });

      const data = await res.json();
      console.log({ data });

      if (data.error) {
        throw data.error;
      }

      showNotification({
        title: startCase(tCommon("success")),
        message: startCase(tCommon("login success")),
        color: "green",
      });

      // TODO: Store access token in cookie
      document.cookie = `next-auth.session-token=${data.user.accessToken};`;
      // TODO: redirect to dashboard
      router.push("/gallery");
    } catch (error) {
      if (typeof error === "string") {
        showNotification({
          title: tCommon("error"),
          message: error,
          color: "red",
        });
      } else if (error instanceof Error) {
        showNotification({
          title: tCommon("error"),
          message: error.message,
          color: "red",
        });
      } else {
        showNotification({
          title: tCommon("error"),
          message: SOMETHING_WENT_WRONG,
          color: "red",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center">
      <Background_1 className="" />
      <Loading />

      <div className="login bg-white shadow-md w-full max-w-[1100px] shadow-black rounded-md p-5 flex flex-col items-center">
        <div className="logo w-full flex justify-start items-center">
          <Logo_White
            className="rounded-full shadow shadow-gray-500"
            size={80}
          />
          <h1 className="text-gray-400 mx-5">{startCase(tCommon("login"))}</h1>
        </div>

        <hr className="my-5 w-full" />

        <div className="inputs flex flex-col items-start justify-start w-full">
          <input
            type="text"
            name="username"
            placeholder={startCase(tCommon(camelCase("username")))}
            spellCheck={false}
            onChange={(e) => {
              setUsername(e.target?.value?.trim());
            }}
            className="outline-none focus:outline-dashed text-red-500 font-[Nunito] focus:outline-red-500 my-2 p-5 bg-white rounded-md w-full shadow shadow-gray-400"
          />
          <input
            type="password"
            name="password"
            placeholder={startCase(tCommon(camelCase("password")))}
            spellCheck={false}
            onChange={(e) => {
              setPassword(e.target?.value?.trim());
            }}
            className="outline-none text-red-500 font-[Nunito] focus:outline-dashed focus:outline-red-500 my-2 p-5 bg-white rounded-md w-full shadow shadow-gray-400"
          />
        </div>

        <div className="buttons flex flex-col items-center justify-center w-full">
          <button
            className="my-2 p-5 bg-red-500 text-white font-[Nunito] tracking-wider rounded-md w-full shadow shadow-gray-400"
            onClick={onLoginClick}
          >
            {startCase(tCommon(camelCase("login")))}
          </button>

          <Link href={"/register"}>
            <a className="text-red-500 font-bold border-b border-dashed border-red-300 font-[Monteserrat] text-sm tracking-wider p-2 rounded-md hover:bg-red-500 hover:bg-opacity-5">
              {capitalize(
                startCase(tCommon(camelCase("dont have an account")))
              )}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
