import { FC, useEffect, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import dynamic from "next/dynamic";
import { InitialState, ItemCard, ItemType } from "@types";
import { AddFavorites } from "@actions";

import { CardContainer, CardContent, CardList, CardText } from "@components/Card/styles";

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

type Props = PropsFromRedux & {
  item: ItemCard;
  type: ItemType;
  simple?: boolean;
}

const Card: FC<Props> = ({ item, type, api, simple = false }) => {
  const cardRef = useRef<HTMLElement|null>(null);
  const [show, setShow] = useState(false);
  const typeValidation = type === "character";
  const apiValidation = api === "rickandmorty";
  const urlCard = typeValidation ? `/view/${item.id}` : `/view/${item.id}?type=starship`;

  useEffect(() => {
    Promise.resolve(
      typeof window.IntersectionObserver !== "undefined"
        ? window.IntersectionObserver
        : dynamic(() => import("intersection-observer"))
    )
      .then(() => {
        const element = cardRef.current as Element;
        const observer = new IntersectionObserver((entries) => {
          const { isIntersecting } = entries[0];
          if (isIntersecting) {
            setShow(true);
            observer.disconnect();
          }
        });

        if (element) {
          observer.observe(element);
        }
      });
  }, [cardRef])

  return (
    <CardContainer ref={cardRef}>
      {show && (
        <CardContent href={urlCard}><a>
          <CardList>
            <CardText><strong>Name:</strong> {item.name}</CardText>
            {item.model && (
              <CardText>
                <strong>{apiValidation ? "Episode" : "Model"}:</strong>
                {` ${item.model}`}
              </CardText>
            )}
            {item.weight && (
              <CardText>
                <strong>{apiValidation ? "Status" : "Weight"}:</strong>
                {` ${item.weight}`}
              </CardText>
            )}
            {item.height && (
              <CardText>
                <strong>{apiValidation ? "Specie" : "Height"}:</strong>
                {` ${item.height}`}
              </CardText>
            )}
            {item.birthday && (
              <CardText>
                <strong>{apiValidation ? "Origin" : "Birthday"}:</strong>
                {` ${item.birthday}`}
              </CardText>
            )}
            {item.creditsCost && <CardText>Credits cost: {item.creditsCost}</CardText>}
            {item.cargoCapacity && <CardText>Cargo capacity: {item.cargoCapacity}</CardText>}
            {item.movies && (
              <CardText>
                <strong>{apiValidation ? "Characters" : "Movies"}:</strong>
                <CardList nested simple={simple}>
                  {[...item.movies]?.splice(0, 5).map((movie) => (
                    <CardText key={movie}>{movie}</CardText>
                  ))}
                </CardList>
              </CardText>
            )}
          </CardList>
        </a></CardContent>
      )}
    </CardContainer>
  );
};

export default connector(Card);