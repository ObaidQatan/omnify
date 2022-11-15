import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { User } from "../../../types/User";
import { loadingState } from "../Loading";
import Menu from "./Menu";

interface Props {
  user?: User;
}

const Header = (props: Props) => {
  const router = useRouter();
  const { t: tCommon } = useTranslation("common");
  const [loading, setLoading] = useRecoilState(loadingState);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://xjhrfldvdasjxazqxgox.supabase.co/storage/v1/object/public/users-data/public/avatars/${props.user?.id}.png`
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
    <div className="header flex flex-row w-full h-16 bg-white border-b border-gray-200">
      <div className="back-btn flex flex-row items-center justify-center w-16 h-full">
        <button
          className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
          onClick={() => router.back()}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
      </div>

      {/** Build avatar and menu show up on hover */}
      <div className="avatar-container relative flex flex-1 items-center justify-end h-full px-5">
        <div
          className="avatar cursor-pointer flex relative flex-row items-center justify-center overflow-hidden border border-red-300 w-10 h-10 bg-gray-100 rounded-full"
          onClick={() => {
            // toggle menu
            setMenuOpen(!menuOpen);
          }}
        >
          <Image
            src={avatarUrl || "/img/other/avatar.svg"}
            alt="Avatar"
            layout="fill"
            objectFit="fill"
          />
        </div>
        <Menu
          opened={menuOpen}
          className="absolute top-16 right-0 z-10 shadow"
        />
      </div>
    </div>
  );
};

export default Header;
