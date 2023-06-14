import { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* 전역 스타일을 정의합니다. */

  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    overflow:hidden;
  }

  /* 다른 전역 스타일을 추가로 정의할 수 있습니다. */
`;

const App = ({ Component }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Component />
    </>
  );
};

export default App;
