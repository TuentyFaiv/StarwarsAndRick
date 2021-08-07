import { AddFavorite, ChangeApi, InitialStateApi, RemoveAllFavorite, RemoveFavorite, TypeGetData } from "@types";

export interface Character {
  id: string;
  name: string;
  height: string;
  weight: string;
  planet: string;
  birthday: string;
  genre: string;
  movies: string[];
}

export interface Starship {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  creditsCost: string;
  width: string;
  passengers: string;
  cargoCapacity: string;
  movies: string[];
}

export interface ItemFavorite {
  id: string;
  name: string;
  movies: string[];
  model?: string;
  manufacturer?: string;
  creditsCost?: string;
  width?: string;
  passengers?: string;
  cargoCapacity?: string;
  height?: string;
  weight?: string;
  planet?: string;
  birthday?: string;
  genre?: string;
}

export interface Planet {
  id?: number;
  name: string;
  rotation_period?: string;
  orbital_period?: string;
  diameter?: string;
  climate?: string;
  gravity?: string;
  terrain?: string;
  surface_water?: string;
  population?: string;
  residents: string[];
  films?: string[];
  created?: string;
  edited?: string;
  url?: string;
  type?: string;
  dimension?: string;
}

export interface RemovePayload {
  id: string;
  name: string;
}

export interface AddFavoriteAction {
  type: AddFavorite;
  payload: ItemFavorite;
}

export interface RemoveFavoriteAction {
  type: RemoveFavorite;
  payload: RemovePayload;
}

export interface RemoveAllFavoriteAction {
  type: RemoveAllFavorite;
}

export interface ChangeApiPayload {
  api: {
    origin: InitialStateApi;
    characters: "people" | "character";
    starships: "starships" | "episode";
  };
  type: TypeGetData;
}

export interface ChangeApiAction {
  type: ChangeApi;
  payload: ChangeApiPayload
}

export interface ServerItemProps {
  props: {
    item: Character|Starship;
  }
}

export interface GetAllCharacters {
  loading?: boolean;
  count: number;
  next: string;
  previous: string;
  results: Character[];
}

export interface GetAllStarships {
  loading?: boolean;
  count: number;
  next: string;
  previous: string;
  results: Starship[]
}
