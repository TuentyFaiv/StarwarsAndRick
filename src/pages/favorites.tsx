import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { InitialState, ItemCard } from "@types";
import { RemoveAllFavorites, RemoveFavorites } from "@actions";

import { Button, Title } from "@styles/Globals";
import { FCard, FContainer, FContent } from "@styles/Favorites";

import Card from "@components/Card/Card";

const mapState = (state: InitialState) => ({
  favorites: state.favorites
});

const mapDipatch = {
  removeFavorite: RemoveFavorites,
  removeAllFavorites: RemoveAllFavorites
};

const connector = connect(mapState, mapDipatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {};

const Favorites: FC<Props> = ({ favorites, removeFavorite, removeAllFavorites }) => {
  const handleRemoveOne = (id: string, name: string) => () => {
    removeFavorite({ id, name });
  };

  const handleRemoveAll = () => {
    removeAllFavorites();
  };

  return (
    <FContainer>
      <FContent>
        <Title>Favorites</Title>
        <Button type="button" onClick={handleRemoveAll}>
          Delete all items from favorites
        </Button>
        {
          favorites.map((favorite) => {
            const item = favorite as unknown as ItemCard;
            return (
              <FCard key={`${favorite.id}${favorite.name}`}>
                <Card
                  item={item}
                  type={item.cargoCapacity ? "starship" : "character" }
                />
                <Button
                  type="button"
                  onClick={handleRemoveOne(item.id, item.name)}
                >
                  Delete from favorites
                </Button>
              </FCard>
            )
          })
        }
      </FContent>
    </FContainer>
  );
}

export default connector(Favorites);
