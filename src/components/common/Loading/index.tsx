import React from "react";
import { ScaleLoader } from "react-spinners";
import { atom, useRecoilState } from "recoil";

// Create new atom for loading
export const loadingState = atom<boolean>({
  key: "loading-state",
  default: false,
});

const Loading = ({
  loading: loadingProp,
  props,
}: {
  loading?: boolean;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}) => {
  const [loading, setLoading] = useRecoilState(loadingState);

  if (loading) {
    return (
      <div
        className="fixed flex justify-center items-center top-0 left-0 h-screen w-screen bg-black bg-opacity-30 z-[2000]"
        {...props}
      >
        <div className="wrapper bg-[#7367f0] py-5 px-8 rounded-md">
          <ScaleLoader loading={true} />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Loading;
