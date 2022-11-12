import { Accordion } from "@mantine/core";
import { camelCase, lowerCase, startCase, upperCase } from "lodash";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { menuSelectedItem } from "../../../../pages/dashboard/superAdmin";
import { MenuItem as MenuItemType } from "../../../types/MenuItem";
import { menuItems as importedData } from "./data";
import MenuItem from "./MenuItem";

const Sidebar = ({
  className,
  style,
  data,
}: {
  className?: string;
  style?: React.CSSProperties;
  data?: MenuItemType[];
}) => {
  const { t: tCommon } = useTranslation("common");
  const [menuSelectedItemId, setmenuSelectedItemId] =
    useRecoilState(menuSelectedItem);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(
    data || importedData
  );

  const router = useRouter();
  return (
    <div
      className={`sidebar flex flex-col w-[260px] h-full px-5 py-3 z-10 ${className}`}
      style={{
        boxShadow: "rgb(0 0 0 / 2%) 0px 0px 10px 12px",
        ...style,
      }}
    >
      <div className="translate-x-1 hidden"></div>
      <div className="bar-header flex justify-start items-center shadow-white shadow-md z-[1]">
        <div className="logo relative w-[50px] h-[50px]">
          <Image
            src="/img/logo.jpg"
            layout="fill"
            objectFit="fill"
            alt="logo"
          />
        </div>

        <div className="title text-[#7367f0] font-[Cairo]">
          <h2 className="text-[18px] px-2">{tCommon("appName")}</h2>
        </div>
      </div>

      <div className="bar-body flex-1 flex flex-col overflow-y-hidden hover:overflow-y-scroll">
        {menuItems.map((menu) => (
          <div key={menu.id} className="border-b">
            <div
              className={`${
                menu.hide ? "hidden" : ""
              } menu-header flex justify-start items-center pt-5 px-2 text-gray-400`}
            >
              <div className="image relative h-[30px] w[30px]">
                <Image src={menu.icon} alt="" layout="fill" objectFit="fill" />
              </div>

              <label className="text-[12px] tracking-widest font-[Cairo]">
                {upperCase(menu.title)}
              </label>
            </div>

            <div className="menu-body flex flex-col font-[Monteserrat]">
              {menu.options.map((option) =>
                option.children.length > 0 ? (
                  <Accordion
                    key={option.id}
                    styles={{
                      item: {
                        border: "none",
                      },
                    }}
                  >
                    <Accordion.Item
                      value={option.title}
                      className="border-none outline-none"
                    >
                      <Accordion.Control>
                        <MenuItem
                          className={`py-0 text-gray-500`}
                          onClick={() => {
                            setmenuSelectedItemId(option.id.toString());
                            console.log({ menuSelectedItemId });
                          }}
                        >
                          <div className="image relative h-[20px] w-[20px] opacity-60">
                            <Image
                              src={option.icon}
                              alt=""
                              layout="fill"
                              objectFit="fill"
                            />
                          </div>

                          <h3 className="px-4">
                            {startCase(tCommon(camelCase(option.title)))}
                          </h3>
                        </MenuItem>
                      </Accordion.Control>

                      <Accordion.Panel>
                        {option.children.map((child) => (
                          <MenuItem
                            key={child.id}
                            className={`${
                              child.id.toString() === menuSelectedItemId
                                ? "bg-[#7367f0] text-white clicked-menu-item rounded-lg z-10"
                                : "text-gray-500"
                            }`}
                            onClick={() => {
                              setmenuSelectedItemId(child.id.toString());
                              console.log({ menuSelectedItemId });
                              router.push(child.link);
                            }}
                          >
                            <div className="image relative h-[20px] w-[20px] opacity-60">
                              <Image
                                src={child.icon}
                                alt=""
                                layout="fill"
                                objectFit="fill"
                              />
                            </div>

                            <h3 className="px-4">
                              {startCase(tCommon(camelCase(child.title)))}
                            </h3>
                          </MenuItem>
                        ))}
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                ) : (
                  <MenuItem
                    key={option.id}
                    className={`${
                      option.id.toString() === menuSelectedItemId
                        ? "bg-[#7367f0] text-white clicked-menu-item rounded-lg z-10"
                        : "text-gray-500"
                    }`}
                    onClick={() => {
                      setmenuSelectedItemId(option.id.toString());
                      console.log({ menuSelectedItemId });
                      router.push(option.link);
                    }}
                  >
                    <div className="image relative h-[20px] w-[20px] opacity-60">
                      <Image
                        src={option.icon}
                        alt=""
                        layout="fill"
                        objectFit="fill"
                      />
                    </div>

                    <h3 className="px-4">
                      {startCase(tCommon(camelCase(option.title)))}
                    </h3>
                  </MenuItem>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
