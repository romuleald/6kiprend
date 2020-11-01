import {CardType} from "../../type/type";
import css from "./card.module.css";
import React from "react";

const Card = ({cardProps, isVisible = false}: { cardProps: CardType, isVisible: boolean }) =>
    <div
        className={`${css.card} ${isVisible ? 'visible' : ''}`}>
        <p className={css.itemLine}>
            <span>{cardProps.number}</span>
            <span>{cardProps.value}</span>
            <span>{cardProps.number}</span>
        </p>
        <p>
            <span className={css.largeNumber}>{cardProps.number}</span>
        </p>
        <p className={css.itemLine}>
            <span className={css.itemBack}>{cardProps.number}</span>
            <span className={css.itemBack}>{cardProps.value}</span>
            <span className={css.itemBack}>{cardProps.number}</span>
        </p>
    </div>

export const CardsSet = ({cards}: { cards: CardType[] }) =>
    <ul className={css.cards}>
        {cards.map((card, index) =>
            <li
                key={index}
                className={css.listItem}>
                <Card
                    cardProps={{number: card.number, value: 1, isVisible: false}}
                    isVisible={card.isVisible}/>
            </li>)}
    </ul>;
