import './App.css';
import {setGame} from "./cards/generate-game-cards";
import React, {useEffect, useState} from "react";
import {ThemeContext} from './context/context';
import {JoinGame, SetGame, StartGame} from "./Components/Forms/Forms";
import {CardsSet} from "./Components/Card/Cards";

// fake context
const gameSetup = setGame({playersCount: 3});

export const App = () => {

    const [appContext, setAppContext] = useState({id: null, state: gameSetup});
    useEffect(() => {

    });
    return (
        <ThemeContext.Provider value={appContext}>
            <div className="App">
                <SetGame/>
                <JoinGame/>
                <StartGame/>
                <div>
                    <h2>Joueurs</h2>
                    <ul>
                        {appContext.state.players.map((player, index) => <li key={index}>
                                {player.name}
                                <CardsSet cards={player.cards}/>
                            </li>
                        )}
                    </ul>
                </div>
                <div>
                    <h2>plateau</h2>
                    <CardsSet cards={appContext.state.cards.slice(0, 4)}/>
                </div>
                <div>
                    <h2>Joueur</h2>
                    {appContext.state.player.name}
                    <CardsSet cards={gameSetup.player.cards}/>
                </div>
            </div>
        </ThemeContext.Provider>
    );
};
