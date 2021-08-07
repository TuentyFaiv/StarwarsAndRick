import { CharacterHttp } from "@lib/CharacterHttp";
import { StarshipHttp } from "@lib/StarshipHttp";
import { InitialState } from "@types";

// const favorites = localStorage.getItem("favorites");

const initialState: InitialState = {
  favorites: [],
  api: "rickandmorty",
  getCharacters: new CharacterHttp("character", "rick"),
  getStarships: new StarshipHttp("episode", "rick")
};

export default initialState;
