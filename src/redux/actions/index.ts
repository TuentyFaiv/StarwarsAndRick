import {
  AddFavoriteAction,
  ChangeApiAction,
  ChangeApiPayload,
  ItemFavorite,
  RemoveAllFavoriteAction,
  RemoveFavoriteAction,
  RemovePayload
} from "@interfaces";

export const AddFavorites = (payload: ItemFavorite): AddFavoriteAction => {
  return {
    type: "ADD_TO_FAVORITES",
    payload
  };
};

export const RemoveFavorites = (payload: RemovePayload): RemoveFavoriteAction => {
  return {
    type: "REMOVE_FROM_FAVORITES",
    payload
  };
};

export const RemoveAllFavorites = (): RemoveAllFavoriteAction => {
  return {
    type: "REMOVE_ALL_FROM_FAVORITES"
  };
};

export const ChangeApi = (payload: ChangeApiPayload): ChangeApiAction => {
  return {
    type: "CHANGE_API",
    payload
  };
};
