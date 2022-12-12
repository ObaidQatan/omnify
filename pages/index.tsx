import { motion } from "framer-motion";
import { camelCase, capitalize, startCase } from "lodash";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRight, BrandGithub } from "tabler-icons-react";
import Logo_White from "../src/components/common/Logo/White";

const IndexPage = () => {
  const { t: tCommon } = useTranslation("common");
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-start bg-red-400">
      {/* ====== header ====  */}
      <div className="header w-full h-[80px] flex items-center justify-end">
        {/* ====== github link ==== */}
        <Link href="https://github.com/ObaidQatan/omnify/">
          <a
            target="_blank"
            className="text-white text-sm p-2 rounded-lg m-2 bg-[#00000020]"
          >
            <BrandGithub />
          </a>
        </Link>
        {[
          {
            name: "Gallery",
            link: "/gallery",
          },
          {
            name: "Profile",
            link: "/profile",
          },
          {
            name: "About Team",
            link: "/about",
          },
        ]
          .reverse()
          .map((item, index) => (
            <Link href={item.link} key={index}>
              <a className="text-white md:text-sm text-[12px] px-5 py-3 m-2 hover:rounded-lg hover:bg-[#ffffff20] rounded-lg bg-[#ffffff20]  md:rounded-none md:bg-transparent">
                {startCase(tCommon(camelCase(item.name)))}
              </a>
            </Link>
          ))}
      </div>

      <div className="body flex-1 w-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.1,
            delay: 0.5,
          }}
        >
          <Logo_White
            size={150}
            className="rounded-full shadow-lg shadow-[#00000050]"
          />
        </motion.div>
        <h1 className="text-4xl font-bold text-white mt-5">
          {tCommon("appName")}
        </h1>
        {/* ====== description ====  */}
        <p className="text-white text-center mt-5">
          {capitalize(
            startCase(
              tCommon(
                camelCase(
                  "Omnify is your best marketplace for hiring two wheelers."
                )
              )
            )
          )}
        </p>
        <button
          className="start-btn flex items-center justify-center bg-red-500 hover:bg-red-600 py-5 px-5 my-5 text-white font-[Nunito] rounded-md shadow shadow-[#00000050]"
          onClick={() => router.push("/login")}
        >
          <h3 className="px-5">
            {startCase(tCommon(camelCase("get started")))}
          </h3>
          <ArrowRight strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
