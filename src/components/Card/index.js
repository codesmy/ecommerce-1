import React, { useState, useContext } from 'react'
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';

import styled from './Card.module.scss'

function Card({ id, title, imageUrl, price, onPlus, onFavorite, favorited = false, loading = false }) {

    const { isItemAdded } = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);
    const obj = { id, parentId: id, title, imageUrl, price };

    const onClickPlus = () => {
        onPlus(obj)
    }

    const onClickFavorite = () => {
        onFavorite(obj)
        setIsFavorite(!isFavorite)
    }


    return (
        <div className={styled.card}>
            {
                loading ? (
                    <ContentLoader
                        className='loading'
                        speed={2}
                        width={155}
                        height={250}
                        viewBox="0 0 155 265"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                        <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                        <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                        <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                    </ContentLoader>
                ) : (
                    <>
                        {onFavorite && <div className={styled.favorite} onClick={onClickFavorite}>
                            <img src={isFavorite ? "/img/heart-like.svg" : "/img/heart.svg"} alt="" />
                        </div>}
                        <img width={133} height={112} src={imageUrl} alt="" />
                        <h5>{title}</h5>
                        <div className={`${styled.card__footer} d-flex justify-between align-center`}>
                            <div>
                                <p>Цена: </p>
                                <b>{price} руб.</b>
                            </div>
                            {onPlus && <button className={`${styled.button} ${isItemAdded(id) ? styled.check : styled.plus}`} onClick={onClickPlus}>
                                <img width={11} height={11} src={isItemAdded(id) ? "/img/check.svg" : "/img/plus.svg"} alt="" />
                            </button>}
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default Card;