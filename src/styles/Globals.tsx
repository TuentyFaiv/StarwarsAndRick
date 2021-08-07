import { useContext } from "react";
import styled, { createGlobalStyle, keyframes, ThemeContext } from "styled-components";

type GProps = {
  theme: {
    theme: string
  }
};

export const useThemeContext = () => useContext(ThemeContext);

const loaderAnimation = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

export const GlobalStyles = createGlobalStyle<GProps>`

  :root {
    --link-active: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --btn: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --btn-delete: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --btn-delete-all: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --btn-add: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --btn-change: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --btn-active: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --box-shadow: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --box-shadow-hover: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --bg-body: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --bg-layout: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --scrollbar: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --scrollbar-thumb: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --bg-loader: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --loader-color: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --text-color: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
    --bg-header: ${({ theme }) => (theme.theme === "rick" ? "blue" : "red")};
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  body {
    font-size: 1.6rem;
    min-height: 100vh;
    &::-webkit-scrollbar {
      width: 10px;
      background-color: #CCCCCC;
    }
    &::-webkit-scrollbar-thumb {
      width: 10px;
      background-color: #333333;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const Title = styled.h1`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  font-size: 3rem;
`;

export const Button = styled.button`
  min-width: 100px;
  padding: 5px 15px;
  margin: 0;
  font-size: 1.5rem;
  border: none;
  outline: 0;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
  @media screen and (min-width: 426px) {
    min-width: 130px;
    margin: 0 10px;
    padding: 5px 25px;
    font-size: 1.6rem;
  }
`;

export const Loading = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, .35);
  align-items: center;
  justify-content: center;
  inset: 0;
  z-index: 5;
  & > div {
    display: block;
    position: relative;
    width: 80px;
    height: 80px;
    margin: auto;
    & > div {
      position: absolute;
      border: 4px solid aquamarine;
      opacity: 1;
      border-radius: 50%;
      animation: ${loaderAnimation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      &:nth-child(2) {
        animation-delay: -0.5s;
      }
    }
  }
`;
