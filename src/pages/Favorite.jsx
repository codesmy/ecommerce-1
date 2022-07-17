import React, { useContext } from "react";
import Card from "../components/Card";
import InfoPage from "../components/InfoPage";
import AppContext from "../context";

function Favorite() {
  const { favoriteItems, onAddToFavorite } = useContext(AppContext);

  return (
    <div className="content pt-40">
      <div className="d-flex justify-between align-center">
        <h2 className="mb-40">Мои закладки</h2>
      </div>

      <div className="d-flex flex-wrap gap-10">
        {favoriteItems.length > 0 ? (
          favoriteItems.map((item, index) => (
            <Card
              key={index}
              /*
                            title={item.title}
                            imageUrl={item.imageUrl}
                            price={item.price}
                            */
              favorited={true}
              onFavorite={onAddToFavorite}
              {...item}
            />
          ))
        ) : (
          <InfoPage
            title={"Закладок нет :("}
            description={
              "Вы ничего не добавляли в закладки."
            }
            image={"/img/fav.png"}
          />
        )}
      </div>
    </div>
  );
}

export default Favorite;
