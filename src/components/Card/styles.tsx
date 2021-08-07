import styled, { css } from "styled-components";
import Link from "next/link";

type CLProps = {
  nested?: boolean
}

export const CardContainer = styled.article`
  width: 100%;
  min-height: 100px;
  padding: 10px;
`;

export const CardContent = styled(Link)`
  width: 100%;
`;

export const CardList = styled.ul<CLProps>`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  ${({ nested }) => nested && css`
    display: grid;
    grid-template-columns: 100%;
    column-gap: 10px;
    row-gap: 10px;
    @media screen and (min-width: 426px) {
      grid-template-columns: 1fr 1fr;
      column-gap: 20px;
      row-gap: 20px;
    }
  `}
`;

export const CardText = styled.li`
  margin: 10px 0;
  white-space: pre-wrap;
`;
