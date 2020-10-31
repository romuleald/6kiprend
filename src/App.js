import './App.css';
import {setGame} from "./cards/generate-game-cards";
import css from './Card/card.module.css';
import React, {useState} from "react";
import {db} from './db/init';
import {nanoid} from 'nanoid'

const CardsSet = ({cards}) =>
    <ul className={css.cards}>
        {cards.map((card, index) =>
            <li
                key={index}
                className={css.listItem}>
                <Card
                    cardProps={{number: card.number}}
                    isVisible={card.isVisible}/>
            </li>)}
    </ul>;

const Card = ({cardProps, isVisible = false}) => <div
    className={`${css.card} ${isVisible ? 'visible' : ''}`}>Carte {cardProps.number}</div>

const gameSetup = setGame({playersCount: 3});

const SetGame = () => {
    const [name, setName] = useState();
    const [id, setId] = useState();
    return <form onSubmit={event => {
        event.preventDefault();
        const tempId  = nanoid();
        setId(tempId)
        db.ref(`/gameId/${tempId}`).set({
            name,
        });
    }}>
        <label htmlFor="create-game">Créer un jeu</label>
        <input id="create-game" required minLength={3} type="text" onInput={event => setName(event.target.value)}/>
        <input type="submit"/>
        <p>ID de la partie : {id}</p>
    </form>;
};
const JoinGame = () => {
    const [id, setId] = useState();
    const [name, setName] = useState('');
    return <form onSubmit={event => {
        event.preventDefault();
        db.ref(`/gameId/${id}`).once('value').then((snapshot) => {
            setName(snapshot.val().name)
        });
    }}>
        <label htmlFor="join-game">Joindre un jeu</label>
        <input id="join-game" type="text" onInput={event => setId(event.target.value)}/>
        <input type="submit"/>
        <p>Nom de la partie: {name}</p>
    </form>;
};

function App() {
    return (
        <div className="App">
            <SetGame/>
            <JoinGame/>
            <div>
                <h2>Joueurs</h2>
                <ul>
                    {gameSetup.players.map((player, index) => <li key={index}>
                            {player.name}
                            <CardsSet cards={player.cards}/>
                        </li>
                    )}
                </ul>
            </div>
            <div>
                <h2>plateau</h2>
                <CardsSet cards={gameSetup.cards.slice(0, 4)}/>
            </div>
            <div>
                <h2>Joueur</h2>
                {gameSetup.player.name}
                <CardsSet cards={gameSetup.player.cards}/>
            </div>
        </div>
    );
}

export default App;
