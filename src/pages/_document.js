import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html
      className="scrollbar-thumb-secondaryBg scrollbar-track-transparent scroll-smooth"
      lang="en"
    >
      <Head />
      <body className="bg-primaryBg text-primaryText">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
