import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const colors = {
  point: "crimson",
};

export const spacing = {
  side: "100px",
  moSide: "20px",
};

export const GlobalStyled = createGlobalStyle`
    ${reset}

    *{box-sizing: border-box;}

    body{
        font-family: "Noto Sans KR", sans-serif;
        background-color: #1d1d1d;
        color: white;
        letter-spacing: -1px;
        word-break: keep-all;
        // 단어가 잘려서 문단이 내려가는 것 방지
    }

    a{
        text-decoration: none;
        color: white;
    }

    img {
      width: 100%;
      display: block;
    }

`;
