import styled from "styled-components";

export const HomeTabs = styled.section`
  display: flex;
  width: 100%;
  max-width: 900px;
  margin: 0 auto 30px;
  align-items: center;
  justify-content: space-evenly;
  @media screen and (min-width: 426px) {
    justify-content: flex-start;
  }
`;

export const HomeContainer = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const HomeContent = styled.div`
  display: grid;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  grid-template-columns: 1fr;
  row-gap: 20px;
  column-gap: 20px;
  @media screen and (min-width: 426px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 601px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const HomeActiveLoad = styled.div`
  width: 100%;
  height: 40px;
  margin: 20px 0;
  @media screen and (min-width: 426px) {
    height: 60px;
    
  }
`;
