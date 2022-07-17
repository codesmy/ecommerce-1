import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart';


function Header(props) {
const { totalPrice } = useCart();


  return (
    <header className="clear d-flex align-center justify-between">
        <div className="brand">
          <div className="logo text-uppercase">
          <Link to="/">
            Logo
            </Link>
          </div>
        </div>
        <ul className="menu d-flex align-center gap-20">
          <li className="d-flex align-center gap-10 cu-p" onClick={props.onClickCart}>
          <img width={18} height={18} src="/img/cart.svg" alt='' />

            <span>{totalPrice} руб</span>
          </li>
          <li>
              <Link to="/favorite"><img width={18} height={18} src="/img/favorite.svg" alt='' /></Link>
          </li>
          <li>
              <Link to="/order"><img width={18} height={18} src="/img/user.svg" alt='' /></Link>
          </li>
        </ul>
      </header>
  )
}

export default Header