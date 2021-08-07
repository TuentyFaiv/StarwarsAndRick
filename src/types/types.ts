import { Character, ItemFavorite, Starship } from "@interfaces";
import { CharacterHttp } from "@lib/CharacterHttp";
import { StarshipHttp } from "@lib/StarshipHttp";

export type InitialStateApi = "starwars" | "rickandmorty";

export type InitialState = {
  favorites: ItemFavorite[];
  api: InitialStateApi;
  getCharacters: CharacterHttp;
  getStarships: StarshipHttp;
};

export type AddFavorite = "ADD_TO_FAVORITES";
export type RemoveFavorite = "REMOVE_FROM_FAVORITES";
export type RemoveAllFavorite = "REMOVE_ALL_FROM_FAVORITES";
export type ChangeApi = "CHANGE_API";

export type Constants = {
  ADD_TO_FAVORITES: AddFavorite;
  REMOVE_FROM_FAVORITES: RemoveFavorite;
  REMOVE_ALL_FROM_FAVORITES: RemoveAllFavorite;
  CHANGE_API: ChangeApi;
};

export type ItemCard = {
  id: string;
  name: string;
  height?: string;
  model?: string;
  weight?: string;
  birthday?: string;
  creditsCost?: string;
  cargoCapacity?: string;
  movies?: string[];
};

export type ItemType = "character" | "starship";

export type ItemProp = Character | Starship | never;

export type TypeGetData = "rick" | "star";

export type FilmsType = "characters" | "episodes" | "films";

export type GetData = (path: string, type?: TypeGetData) => Promise<any>;

export type Loading = {
  loading?: boolean;
}
