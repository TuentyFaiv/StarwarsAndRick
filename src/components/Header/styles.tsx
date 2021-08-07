import styled from "styled-components";

export const HContainer = styled.header`
  width: 100%;
  padding: 0 16px;
`;
export const HNav = styled.nav`
  display: flex;
  width: 100%;
  max-width: 900px;
  padding: 20px 0;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
`;
export const HList = styled.ul`
  display: flex;
  width: 100%;
  min-height: 80px;
  margin: 0;
  padding: 0;
  list-style: none;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column-reverse;
  @media screen and (min-width: 426px) {
    align-items: flex-end;
  }
  @media screen and (min-width: 601px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
`;
export const HItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child {
    margin-bottom: 20px;
  }
  @media screen and (min-width: 426px) {
    justify-content: space-evenly;
  }
  @media screen and (min-width: 601px) {
    &:last-child {
      margin-bottom: 0px;
    }
  }
`;
export const HLink = styled.a`
  display: block;
  padding: 5px 15px;
  margin: 0 15px;
  border-bottom: 1px solid transparent;
  &[data-active="true"],
  &:hover {
    border-bottom: 1px solid var(--link-active);
  }
  @media screen and (min-width: 426px) {
    padding: 5 25px;
    margin: 0 25px;
  }
`;

export const HBack = styled.button`
  display: block;
  width: max-content;
  padding: 5px;
  padding-left: 0;
  background-color: transparent;
  font-size: 1.6rem;
  border: none;
  outline: 0;
  &:hover {
    cursor: pointer;
  }
  & span {
    &:nth-of-type(2) {
      display: none;
    }
  }
  @media screen and (min-width: 426px) {
    min-width: 100px;
    padding: 5px 10px;
    padding-left: 0;
    & span {
      &:nth-of-type(2) {
        display: inline;
      }
    }
  }
`;
