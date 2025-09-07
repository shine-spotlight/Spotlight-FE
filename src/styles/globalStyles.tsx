import React from "react";
import { Global, css } from "@emotion/react";

export const GlobalStyles: React.FC = () => (
  <Global
    styles={css`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
      }
      html,
      body,
      #root {
        height: 100%;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI",
          "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: var(--app-bg);
        color: var(--text-primary);
        line-height: 1.6;
        overflow-x: hidden;
      }

      :root {
        /* expose a few CSS vars for non-emotion areas */
        --app-bg: #f8f9fa;
        --text-primary: #343a40;
      }

      a {
        color: inherit;
        text-decoration: none;
      }
      ul,
      ol {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      img {
        max-width: 100%;
        height: auto;
      }

      /* Scrollbars */
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #f1f3f5;
      }
      ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }

      button,
      input,
      textarea {
        font-family: inherit;
      }
      button {
        cursor: pointer;
        border: none;
        outline: none;
        transition: all 0.2s ease;
      }
    `}
  />
);
