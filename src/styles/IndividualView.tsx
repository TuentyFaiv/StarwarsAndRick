import styled from "styled-components";

export const IContainer = styled.section`
  width: 100%;
`;

export const IContent = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  & button {
    margin: 30px 0;
  }
`;

export const IDescription = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100%;
  @media screen and (min-width: 426px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    column-gap: 20px;
  }
`;

export const ISubTitle = styled.h2``;

export const IText = styled.p`
  margin: 10px 0;
  @media screen and (min-width: 426px) {
    margin: 15px 0;
  }
`;

export const IList = styled.ul`
  display: grid;
  width: 100%;
  padding: 0;
  margin: 0;
  grid-template-columns: 100%;
  column-gap: 15px;
  row-gap: 15px;
  list-style: none;
  @media screen and (min-width: 426px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 0;
  }
`;

export const IListItem = styled.li`
  border-bottom: 1px solid rgba(0, 0, 0, .25);
  padding: 10px 10px 25px;
  white-space: pre-wrap;
  &:last-child {
    border-bottom: 1px solid transparent;
  }
  @media screen and (min-width: 426px) {
    padding: 10px 10px 20px;
    margin-bottom: 10px;
  }
  @media screen and (min-width: 601px) {
    padding: 15px 10px 30px;
    margin-bottom: 15px;
  }
`;
