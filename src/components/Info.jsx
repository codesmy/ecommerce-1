import React, { useContext } from "react";
import AppContext from "../context";

function Info({title, image, description}) {
const {setCartOpened} = useContext(AppContext);

  return (
    <div className="cart__empty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width={120}
        src={image}
        alt=""
      />
      <h3>{title}</h3>
      <p className="opacity-6">
        {description}
      </p>
      <button className="btn-green" onClick={() => setCartOpened(false)}>
        <img src="/img/arrow.svg" alt="" /> Вернуться назад
      </button>
    </div>
  );
}

export default Info;
