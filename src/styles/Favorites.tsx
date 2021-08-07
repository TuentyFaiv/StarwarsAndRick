import styled from "styled-components";

export const FContainer = styled.section`
  width: 100%;
`;

export const FContent = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  & button {
    display: block;
    margin: 25px auto;
  }
  @media screen and (min-width: 601px) {
    & button {
      margin-left: 0;
      margin-right: auto;
    }
  }
`;

export const FCard = styled.div`
  display: flex;
  width: 100%;
  margin: 30px 0;
  align-items: center;
  justify-content: space-between;
  flex-direction: column-reverse;
  & button {
    min-width: 200px;
  }
  @media screen and (min-width: 601px) {
    flex-direction: row;
  }
`;
