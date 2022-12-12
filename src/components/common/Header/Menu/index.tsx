import { motion } from "framer-motion";
import { camelCase, startCase } from "lodash";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Logout, User as UserIcon } from "tabler-icons-react";
import { User } from "../../../../types/User";

const Menu = ({
  className,
  opened,
  user,
}: {
  className?: string;
  opened: boolean;
  user?: User;
}) => {
  const { t: tCommon } = useTranslation("common");
  const router = useRouter();

  if (!opened) return null;

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      className={`menu flex flex-col items-center w-fit justify-start bg-white text-gray-500 rounded-md p-5 ${
        className && className
      }`}
    >
      {[
        {
          title: startCase(tCommon(camelCase("profile"))),
          icon: <UserIcon color="#e47777" />,
          onClick: () => router.push("/profile"),
        },
        user?.role === "ADMIN"
          ? {
              title: startCase(tCommon(camelCase("admin"))),
              icon: <UserIcon color="#e47777" />,
              onClick: () => router.push("/admin"),
            }
          : null,
        {
          title: startCase(tCommon(camelCase("logout"))),
          icon: <Logout color="#e47777" />,
          onClick: () => router.push("/logout"),
        },
      ].map(
        (item, index) =>
          item && (
            <div
              key={index}
              className="menu-item flex flex-row items-center justify-start w-full h-10 px-5 rounded-md hover:bg-gray-100 cursor-pointer"
              onClick={item?.onClick}
            >
              <div className="icon-container relative flex flex-row items-center justify-center w-8 h-8 mr-5">
                {/** if item.icon is react component, then render it as elemnt, else render Image */}
                {typeof item.icon === "string" ? (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    layout="fill"
                    objectFit="fill"
                  />
                ) : (
                  item.icon
                )}
              </div>
              <div className="title flex flex-row items-center justify-start w-full h-full">
                {item.title}
              </div>
            </div>
          )
      )}
    </motion.div>
  );
};

export default Menu;
