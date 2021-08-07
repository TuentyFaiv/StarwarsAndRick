import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeApi } from "@actions";
import { InitialState, InitialStateApi } from "@types";

import { Button } from "@styles/Globals";
import { HBack, HContainer, HItem, HLink, HList, HNav } from "@components/Header/styles";

const mapState = (state: InitialState) => ({
  api: state.api
});

const mapDipatch = {
  changeApi: ChangeApi
};

const connector = connect(mapState, mapDipatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  onChangeTheme: (api: InitialStateApi) => void
};

const Header: FC<Props> = ({ api, changeApi, onChangeTheme }) => {
  const { pathname, back } = useRouter();
  const apiValidation = api === "starwars";
  const homeValidation = pathname === "/";


  const handleChangeApi = () => {
    onChangeTheme(api);
    changeApi({
      api: {
        origin: apiValidation ? "rickandmorty" : "starwars",
        characters: apiValidation ? "character" : "people",
        starships: apiValidation ? "episode" : "starships"
      },
      type: apiValidation ? "rick" : "star"
    })
  };

  return (
    <HContainer>
      <HNav>
        {!homeValidation && (
          <HBack onClick={() => back()} type="button">
            <span role="img"> ⬅️ </span><span>Go back</span>
          </HBack>
        )}
        <HList>
          <HItem>
            <Button type="button" onClick={handleChangeApi}>
              Change api to {apiValidation ? "Rick & Morty" : "StarWars"}
            </Button>
          </HItem>
          <HItem>
            <Link href="/" passHref>
              <HLink data-active={homeValidation}>Home</HLink>
            </Link>
            <Link href="/favorites" passHref>
              <HLink data-active={pathname === "/favorites"}>Favorites</HLink>
            </Link>
          </HItem>
        </HList>
      </HNav>
    </HContainer>
  );
};

export default connector(Header);