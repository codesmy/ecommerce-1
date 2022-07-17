import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import InfoPage from "../components/InfoPage";


const API_KEY = `${process.env.REACT_APP_MOCK_API_KEY}`;

function Order() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /*
    (async () => {
      const {data} = await axios.get(`${API_KEY}/orders`);

      data.map((obj) => obj.items).flat()
      data.reduce((prev, obj) => [..prev, ...obj.items], [])

    })()
    */

    async function fetchData() {
      try {
        const orderResponse = await axios.get(`${API_KEY}/orders`);
        setIsLoading(false);
        setOrders(
          orderResponse.data.reduce((prev, obj) => [...prev, ...obj.items], [])
        );
      } catch (error) {
        alert("Ощибка при запросе заказов");
      }
    }

    fetchData();
  }, []);

  return (
    <div className="content pt-40">
      <div className="d-flex justify-between align-center">
        <h2 className="mb-40">Мои заказы</h2>
      </div>

      <div className="d-flex flex-wrap gap-10">
        {orders.length > 0 ? (
          (isLoading ? [...Array(6)] : orders).map((item, index) => (
            <Card key={index} loading={isLoading} {...item} />
          ))
        ) : (
          <InfoPage
            title={"У вас нет заказов"}
            description={"Вы нищеброд? Оформите хотя бы один заказ."}
            image={"/img/ord.png"}
          />
        )}
      </div>
    </div>
  );
}

export default Order;
