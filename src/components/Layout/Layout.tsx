import { FC, useState } from "react";
import { ThemeProvider } from "styled-components";
import { InitialStateApi } from "@types";

import { GlobalStyles } from "@styles/Globals";

import Header from "@components/Header/Header";
import { LContent } from "@components/Layout/styles";

const themes: any = {
  rick: "rick",
  star: "star"
};

type Props = {}

const Layout: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<string>("rick");

  const handleChangeTheme = (api: InitialStateApi) => {
    setTheme(api !== "rickandmorty" ? "rick" : "star");
  };

  return (
    <ThemeProvider theme={{ theme: themes[theme] }}>
      <GlobalStyles />
      <Header onChangeTheme={handleChangeTheme} />
      <LContent>
        {children}
      </LContent>
    </ThemeProvider>
  );
}

export default Layout;