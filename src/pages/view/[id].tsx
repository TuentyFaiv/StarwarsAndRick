import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, ConnectedProps } from "react-redux";
import { InitialState, Loading } from "@types";
import { AddFavorites } from "@actions";
import { Character, Starship } from "@interfaces";

import { Button, Loading as LoadingC, Title } from "@styles/Globals";
import { IContainer, IContent, IDescription, IList, IListItem, ISubTitle, IText } from "@styles/IndividualView";
import Link from "next/link";

const mapState = (state: InitialState) => ({
  api: state.api,
  getCharacters: state.getCharacters,
  getStarships: state.getStarships
});

const mapDipatch = {
  addFavorites: AddFavorites
};

const connector = connect(mapState, mapDipatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

const IndividualView: FC<Props> = ({ getCharacters, getStarships, api, addFavorites }) => {
  const { query } = useRouter();
  const id = query.id as string;
  const type = query.type as string;

  const starshipValidation = type === "starship";
  const apiValidation = api === "starwars";
  const noHasValue = "No has value";

  const [character, setCharacter] = useState<Character & Loading>({
    id,
    name: "Loading...",
    height: "Loading...",
    weight: "Loading...",
    planet: "Loading...",
    birthday: "Loading...",
    genre: "Loading...",
    movies: [],
    loading: false
  });
  const [starship, setStarship] = useState<Starship & Loading>({
    id: starshipValidation ? id : "",
    name: "Loading...",
    model: "Loading...",
    manufacturer: "Loading...",
    creditsCost: "Loading...",
    width: "Loading...",
    passengers: "Loading...",
    cargoCapacity: "Loading...",
    movies: [],
    loading: false
  });

  const handleAddFavorite = () => {
    if (starshipValidation) {
      addFavorites(starship);
    } else {
      addFavorites(character);
    }
  }

  const handleGetData = async () => {
    if (starshipValidation) {
      setStarship({ ...starship, loading: true });
      const starshipData = await getStarships.getOne(id);
      const { movies: noHasmovies, ...data } = await starshipData;
      setStarship({ ...data, movies: noHasmovies });

      getStarships.getFilms(noHasmovies, !apiValidation ? "characters" : "films").then((movies) => {
        setStarship({ ...data, movies, loading: false });
      });
    } else {
      setCharacter({ ...character, loading: true });
      const characterData = await getCharacters.getOne(id);
      const { movies: noHasmovies, planet, ...data } = await characterData;
      setCharacter({ ...data, movies: noHasmovies, planet });

      getCharacters.getPlanet(planet).then(({ name: planetName }) => {
        setCharacter({ ...data, planet: planetName, movies: noHasmovies });
        return planetName;
      }).then((planetResponse) => {
        getCharacters.getFilms(noHasmovies, !apiValidation ? "episodes" : "films").then((movies) => {
          setCharacter({ ...data, movies, planet: planetResponse, loading: false });
        });
      });
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      handleGetData();
    }
  }, [id, api]);

  return (
    <IContainer>
      {character.loading && (
        <LoadingC><div><div /><div /></div></LoadingC>
      )}
      {starship.loading && (
        <LoadingC><div><div /><div /></div></LoadingC>
      )}
      <IContent>
        <Title>Page Individual</Title>
        {
          starshipValidation ? (
            <>
              <ISubTitle>{!apiValidation ? "Episode" : "Starship"}</ISubTitle>
              <IDescription>
                {starship.name !== noHasValue && <IText><strong>Name:</strong> {starship.name}</IText>}
                {starship.model !== noHasValue && (
                  <IText>
                    <strong>{!apiValidation ? "Episode" : "Model"}:</strong>
                    {` ${starship.model}`}
                  </IText>
                )}
                {starship.manufacturer !== noHasValue && (
                  <IText><strong>Manufacturer:</strong> {starship.manufacturer}</IText>
                )}
                {starship.creditsCost !== noHasValue && (
                  <IText><strong>Credits cost:</strong> {starship.creditsCost}</IText>
                )}
                {starship.width !== noHasValue && (
                  <IText><strong>Width:</strong> {starship.width}</IText>
                )}
                {starship.passengers !== noHasValue && (
                  <IText><strong>Passengers:</strong> {starship.passengers}</IText>
                )}
                {starship.cargoCapacity !== noHasValue && (
                  <IText><strong>Cargo capacity:</strong> {starship.cargoCapacity}</IText>
                )}
              </IDescription>
              <Button type="button" onClick={handleAddFavorite}>Add to favorites</Button>
              <ISubTitle>{!apiValidation ? "Characters" : "Movies"}:</ISubTitle>
              <IList>
                {typeof starship.movies !== "string" && starship.movies?.map((movie) => (
                  <IListItem key={movie}>{movie?.includes("http") ? "Loading..." : movie}</IListItem>
                ))}
              </IList>
            </>
          ) : (
            <>
              <ISubTitle>Character</ISubTitle>
              <IDescription>
                <IText><strong>Name:</strong> {character.name}</IText>
                <IText>
                  <strong>{!apiValidation ? "Specie" : "Height"}:</strong> {character.height}
                </IText>
                <IText>
                  <strong>{!apiValidation ? "Status" : "Weight"}:</strong> {character.weight}
                </IText>
                <IText>
                  <strong>{!apiValidation ? "Location" : "Planet"}:</strong> {character.planet?.includes("http") ? "Loading..." : character.planet}
                </IText>
                <IText>
                  <strong>{!apiValidation ? "Origin" : "Birthday"}:</strong> {character.birthday}
                </IText>
                <IText><strong>Gender:</strong> {character.genre}</IText>
              </IDescription>
              <Button type="button" onClick={handleAddFavorite}>Add to favorites</Button>
              <ISubTitle>{!apiValidation ? "Episodes" : "Movies"}:</ISubTitle>
              <IList>
                {typeof character.movies !== "string" && character.movies?.map((movie) => (
                  <IListItem key={movie} dangerouslySetInnerHTML={{ __html: movie.includes("http") ? "Loading..." : movie }} />
                ))}
              </IList>
            </>
          )
        }
      </IContent>
    </IContainer>
  );
}


export default connector(IndividualView);