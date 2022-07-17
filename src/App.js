import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import AppContext from './context';
import Order from "./pages/Order";


const API_KEY = `${process.env.REACT_APP_MOCK_API_KEY}`


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /*
    fetch('api')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      })
*/
    async function fetchData() {
      try {
        const [cartResponse, favoriteResponse, itemsResponse] = await Promise.all([
          axios.get(`${API_KEY}/cart`),
          axios.get(`${API_KEY}/favorite`),
          axios.get(`${API_KEY}/items`)
        ])
        //setIsLoading(true);

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavoriteItems(favoriteResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных')
      }

    }

    fetchData()
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        axios.delete(`${API_KEY}/cart/${findItem.id}`)
      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post(`${API_KEY}/cart`, obj)
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }

    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`${API_KEY}/cart/${id}`)
    setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favoriteItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`${API_KEY}/favorite/${obj.id}`)
        setFavoriteItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)))
      }
      else {
        const { data } = await axios.post(`${API_KEY}/favorite`, obj)
        setFavoriteItems((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в закладки')
    }
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favoriteItems,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
        onAddToCart
      }}
    >
      <div className="wrapper">

        {cartOpened && <Drawer items={cartItems} onCloseCart={() => setCartOpened(false)} onRemove={onRemoveItem} />}

        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/favorite">
          <Favorite />
        </Route>
        <Route path="/" exact>
          <Home items={items}
            cartItems={cartItems} searchValue={searchValue} setSearchValue={setSearchValue} onChangeSearchInput={onChangeSearchInput} onAddToFavorite={onAddToFavorite} onAddToCart={onAddToCart} isLoading={isLoading} />
        </Route>
        <Route path="/order">
          <Order />
        </Route>
      </div >
    </AppContext.Provider>
  );
}

export default App;
