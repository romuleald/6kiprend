type CardType = {
    number: number;
    value: number;
    isVisible: boolean;
};
type PlayerType = {
    id: number,
    name: string,
    cards: CardType[]
};
type GameProps = {
    playersCount: number
};

type GameSetup = {
    players: PlayerType[];
    cards: CardType[];
    player: PlayerType
}

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
        name: `joueur ${index +1}`,
        cards: Array(10).fill('').map((item): CardType => {
            const lol = cards[0];
            cards.shift();
            return lol;
        })
    }));
    return {players: players.slice(1), cards, player: players[0]}
};
