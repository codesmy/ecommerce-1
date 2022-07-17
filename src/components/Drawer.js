import React, { useState } from 'react'
import Info from './Info'
import axios from 'axios';
import { useCart } from '../hooks/useCart';

const API_KEY = `${process.env.REACT_APP_MOCK_API_KEY}`

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onCloseCart, onRemove, items = [] }) {
    const { cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    const onclickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post(`${API_KEY}/orders`, {
                items: cartItems
            })
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`${API_KEY}/cart/` + item.id)
                await delay(1000)
            }

        } catch (error) {
            alert('Не удалось сделать заказ :(')
        }
        setIsLoading(false)
    }

    return (
        <div className="overlay">
            <div className="drawer">
                <h3 className="d-flex justify-between mt-30 mb-30">Корзина
                    <img onClick={onCloseCart} className="cu-p" src="/img/close.svg" alt="" />
                </h3>
                {
                    items.length > 0 ? (
                        <>
                            <div className="cart__items">
                                {items.map((obj) => (
                                    <div key={obj.id} className="cart__item d-flex align-center gap-20 mb-20">
                                        <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cart__item-img"></div>
                                        <div>
                                            <p>{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <div className="remove" onClick={() => onRemove(obj.id)}>
                                            <img src="/img/close.svg" alt="" />
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className="cart__total">
                                <ul className="clear">
                                    <li>
                                        <span>Итого</span>
                                        <div></div>
                                        <b>{totalPrice} руб.</b>
                                    </li>
                                    <li>
                                        <span>Скидка 5%:</span>
                                        <div></div>
                                        <b>{totalPrice / 100 * 5} руб.</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onclickOrder}>Оформить заказ <img src="/img/arrow.svg" alt="" /></button>
                            </div>
                        </>
                    ) : (<Info
                        title={isOrderComplete ? "Заказ оформлен" : "Корзина пуста"}
                        description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                        image={isOrderComplete ? "/img/order.jpg" : "/img/cart-empty.png"}
                    />)
                }






            </div>
        </div>
    )
}

export default Drawer