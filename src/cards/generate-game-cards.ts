import {CardType, GameProps, GameSetup, PlayerType} from "../type/type";

const getPartyCards = (): CardType[] => {
    return Array(104).fill('').map((item, index) => ({
        number: index + 1,
        value: 1,
        isVisible: false
    }))
};
export const setGame = ({playersCount}: GameProps): GameSetup => {
    const cards = getPartyCards();
    const players = Array(playersCount).fill('').map((item, index): PlayerType => ({
        id: index,
        name: `joueur ${index + 1}`,
        cards: Array(10).fill('').map((item): CardType => {
            const lol = cards[0];
            cards.shift();
            return lol;
        }),
        currentCard: null,
        takenCard: []
    }));
    return {players: players.slice(1), cards, player: players[0]}
};
