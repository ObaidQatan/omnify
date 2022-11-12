import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import SEO from "../src/components/SEO";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { rtlCache } from "./_document";
import useTranslation from "next-translate/useTranslation";
import NextNProgress from "nextjs-progressbar";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { RecoilRoot } from "recoil";
import ReactTooltip from "react-tooltip";

function MyApp({ Component, pageProps }: AppProps) {
  const { lang, t } = useTranslation();
  const isAR = lang === "ar";

  const currentColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-colorScheme",
    getInitialValueInEffect: true,
    defaultValue: currentColorScheme,
  });

  const toggleColorScheme = (cs?: ColorScheme) => {
    if (cs) {
      setColorScheme(cs);
    } else {
      setColorScheme(currentColorScheme === "light" ? "dark" : "light");
    }
  };

  return (
    <div dir={isAR ? "rtl" : "ltr"}>
      <NextNProgress />
      <Head>
        <title>{t("common:appName")}</title>
        <link rel="icon" href="/favicon.ico" />
        <SEO />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          emotionCache={rtlCache}
          theme={{
            dir: isAR ? "rtl" : "ltr",
            colorScheme,
            defaultRadius: 5,
            fontFamily: isAR ? "Cairo" : "Nunito",
            primaryColor: "cyan",
          }}
        >
          <ModalsProvider>
            <NotificationsProvider
              position={isAR ? "bottom-left" : "bottom-right"}
              zIndex={2077}
            >
              <RecoilRoot>
                <ReactTooltip />
                <Component {...pageProps} />
              </RecoilRoot>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
}

export default MyApp;
