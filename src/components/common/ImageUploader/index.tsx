import { Burger } from "@mantine/core";
import { camelCase, startCase } from "lodash";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRef, useState } from "react";
import SdCard from "../../icons/SdCard";

const ImageUploader = ({
  fileSetter,
  className,
  setShow,
}: {
  fileSetter: (file: File | null) => void;
  className?: string;
  setShow: (show: boolean) => void;
}) => {
  const { t: tCommon } = useTranslation("common");

  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`fixed top-0 left-0 z-[2000] items-center justify-center w-screen h-screen bg-black bg-opacity-10 flex flex-col ${
        className ? className : ""
      }`}
    >
      <div className="wrapper flex flex-col items-center p-5 bg-white rounded-md shadow-lg shadow-black h-full max-h-[500px] w-full max-w-[800px]">
        <div className="closer flex justify-start items-center w-full pb-5">
          <Burger
            opened={true}
            className="hover:bg-gray-100"
            size={15}
            color="gray"
            onClick={() => {
              fileSetter(null);
              setShow(false);
            }}
          />
        </div>
        <div className="body w-full flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            className="hidden"
            onChange={() => setFile(inputRef.current?.files?.[0] || null)}
          />

          {file && (
            <div className="relative w-[150px] h-[150px] m-10 overflow-hidden rounded-full">
              <Image
                src={URL.createObjectURL(file)}
                alt="avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}

          <button
            className="browse-btn rounded-md text-white bg-red-500 px-5 py-2 text-lg"
            onClick={() => inputRef.current?.click()}
          >
            {startCase(tCommon(camelCase("browse image")))}
          </button>

          {file && (
            <button
              data-tip={startCase(tCommon(camelCase("save")))}
              className="done-btn rounded-md text-red-500 bg-white shadow-sm shadow-red-500 px-5 py-2 my-2 text-sm hover:shadow-none hover:translate-y-1"
              onClick={() => {
                fileSetter(file);
                setShow(false);
              }}
            >
              {/** sd card icon */}
              <SdCard size={20} color="#ef4444" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
