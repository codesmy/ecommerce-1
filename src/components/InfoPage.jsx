import React from "react";
import { Link } from 'react-router-dom'


function InfoPage({ title, image, description }) {
  return (
    <div className="d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width={70} src={image} alt="" />
      <h3>{title}</h3>
      <p className="opacity-6">{description}</p>
      <Link to='/' className="btn-green">
          <img  src="/img/arrow.svg" alt="" /> Вернуться назад
      </Link>
    </div>
  );
}

export default InfoPage;
