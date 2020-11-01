export type CardType = {
    number: number;
    value: number;
    isVisible: boolean;
};

export type PlayerType = {
    id: number | null,
    name: string,
    cards: CardType[]
    currentCard: CardType | null
    takenCard: CardType[]
};
export type GameProps = {
    playersCount: number
};

export type GameSetup = {
    players: PlayerType[];
    cards: CardType[];
    player: PlayerType
};
