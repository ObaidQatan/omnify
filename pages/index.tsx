import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { loadingState } from "../src/components/common/Loading";

const Home: NextPage = () => {
  const { t: tCommon } = useTranslation("common");
  const [_, setLoading] = useRecoilState(loadingState);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const onRegisterNowClick = () => {
    // TODO: Open Register Modal
    setIsRegistering(true);
  };

  return (
    <div>
      <h1>{tCommon("appName")}</h1>
    </div>
  );
};

export default Home;
