import React from "react";
import Card from "../components/Card";



function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
    

  const renderItems = () => {
    const filtredItems = items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchValue) ||
        item.title.includes(searchValue)
    );
    return (isLoading ? [...Array(6)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div className="content pt-40">
      <div className="d-flex justify-between align-center">
        <h2 className="mb-40">
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все товары"}
        </h2>
        <div className="search d-flex align-center">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/close.svg"
              alt="Search"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap gap-10">{renderItems()}</div>
    </div>
  );
}

export default Home;
