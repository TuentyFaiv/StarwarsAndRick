import { AnyAction } from "redux";
import { TYPES } from "@constants";
import { InitialState } from "@types";
import initialState from "@initialstate";
import { CharacterHttp } from "@lib/CharacterHttp";
import { StarshipHttp } from "@lib/StarshipHttp";

export default function reducer(state = initialState, { type, payload }: AnyAction): InitialState {
  switch (type) {
    case TYPES.ADD_TO_FAVORITES:
      const favoriteExist = state!.favorites.filter((item) => (
        item.id === payload.id && item.name === payload.name
      ));
      const favoritesAdded = favoriteExist.length > 0 ? state.favorites : [...state.favorites, payload];

      return {
        ...state!,
        favorites: favoritesAdded,
      };
    case TYPES.REMOVE_FROM_FAVORITES:
      const favoritesRemoved = state!.favorites.filter((item) => {
        const validation = item.id !== payload.id || item.name !== payload.name;
        return validation;
      });

      return {
        ...state!,
        favorites: favoritesRemoved,
      };

    case TYPES.REMOVE_ALL_FROM_FAVORITES:
      return {
        ...state!,
        favorites: []
      };
    case TYPES.CHANGE_API:
      return {
        ...state!,
        api: payload.api.origin,
        getCharacters: new CharacterHttp(payload.api.characters, payload.type),
        getStarships: new StarshipHttp(payload.api.starships, payload.type)
      };
    default:
      return state!;
  }
}
