import React from 'react';
import {GameSetup} from "../type/type";

type ContextProps = {
    id: null |string;
    state: GameSetup
}

export const ThemeContext = React.createContext<ContextProps>({
    id: null,
    state: {
        players: [],
        cards: [],
        player: {id: null, takenCard: [], currentCard: null, cards: [], name: ''},
    }
});

