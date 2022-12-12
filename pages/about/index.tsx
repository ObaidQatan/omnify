import { SimpleGrid } from "@mantine/core";
import { camelCase, startCase } from "lodash";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  ArrowLeft,
  BrandGithub,
  BrandLinkedin,
  HomeShare,
} from "tabler-icons-react";

export default function About() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen relative flex flex-col justify-center items-center from-pink-700 to-red-400 bg-gradient-to-tl">
      <ArrowLeft
        className="absolute top-5 left-5 bg-[#ffffff20] rounded-full p-2 cursor-pointer hover:bg-[#ffffff40]"
        color="#fff"
        size={40}
        onClick={() => router.back()}
      />
      {/* ======== cards ======= */}
      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: 1200, cols: 1 }]}
        className="w-full p-5 overflow-y-auto"
      >
        {[
          {
            name: "Obaid Qatan",
            direction: "Software Engineering",
            image: "/img/obaid.jpg",
            other: <Obaid />,
          },
          {
            name: "Muhammadkaif Maniyar",
            direction: "Data Science",
            image: "/img/kaif.jpg",
            other: <Kaif />,
          },
          {
            name: "Krishna",
            direction: "Software Engineering",
            image: "/img/krishna.jpg",
            other: <Krishna />,
          },
          {
            name: "Gangadhara",
            direction: "Data Science",
            image: "/img/gangadhara.jpg",
            other: <Gangadhara />,
          },
        ].map((person) => (
          <Card key={person.name} person={person} />
        ))}
      </SimpleGrid>
    </div>
  );
}

type Person = {
  name: string;
  direction: string;
  image: string;
  other: React.ReactNode;
};

const Card = ({ person }: { person: Person }) => {
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="bg-white backdrop:blur-sm rounded-lg shadow-lg shadow-[#00000030] p-4 flex flex-col h-[500px] lg:hover:scale-105">
      <div className="first flex justify-start items-start w-full border-b pb-5">
        <Image
          src={person.image}
          width={100}
          height={100}
          alt=""
          className="bg-[#00000020] rounded-lg overflow-hidden"
        />
        <div className="flex flex-col justify-start items-start ml-4">
          <h3 className="text-xl font-bold">{person.name}</h3>
          <p className="text-gray-500">
            {startCase(tCommon(camelCase(person.direction)))}
          </p>
        </div>
      </div>
      <div className="second flex-1 flex flex-col justify-start items-start w-full mt-5">
        {person.other}
      </div>
    </div>
  );
};

const Obaid = () => {
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="flex-1 flex flex-col w-full items-center justify-center">
      {[
        {
          title: "GitHub",
          link: "https://github.com/ObaidQatan/",
          icon: <BrandGithub />,
        },
        {
          title: "LinkedIn",
          link: "https://www.linkedin.com/in/obaid-qatan-7699bb185/",
          icon: <BrandLinkedin />,
        },
      ].map((item) => (
        <Link href={item.link} key={item.title}>
          <a
            className="flex items-center justify-center w-full h-10 mt-2 rounded-lg bg-[#00000020] hover:bg-[#00000030] transition-all duration-300"
            target="_blank"
            rel="noreferrer"
          >
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </a>
        </Link>
      ))}
      <div className="url mt-auto opacity-80 hover:bg-[#00000020] hover:rounded-lg">
        <Link href="https://obaid-qatan.vercel.app/">
          <a
            className="flex font-bold tracking-wider"
            target="_blank"
            rel="noreferrer"
          >
            <span className="ml-2">obaid-qatan.vercel.app</span>
            <HomeShare className="ml-2" />
          </a>
        </Link>
      </div>
    </div>
  );
};

const Kaif = () => {
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="flex-1 flex flex-col w-full items-center justify-center"></div>
  );
};

const Krishna = () => {
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="flex-1 flex flex-col w-full items-center justify-center"></div>
  );
};

const Gangadhara = () => {
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="flex-1 flex flex-col w-full items-center justify-center"></div>
  );
};
