import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyles, createStylesServer } from "@mantine/next";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { createEmotionCache } from "@mantine/core";

export const rtlCache = createEmotionCache({
  stylisPlugins: [stylisRTLPlugin],
  key: "mantine-rtl",
});

const stylesServer = createStylesServer(rtlCache);

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="styles"
        />,
      ],
    };
  }

  render() {
    return (
      <Html lang={this.props.locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
