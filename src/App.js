import './App.css';
import {setGame} from "./cards/generate-game-cards";
import css from './Card/card.module.css';

const CardsSet = ({cards}) =>
    <ul className={css.cards}>
        {cards.map(card => <li className={css.listItem}><Card cardProps={{number: card.number}} isVisible={card.isVisible}/></li>)}
    </ul>;

const Card = ({cardProps, isVisible = false}) => <div
    className={`${css.card} ${isVisible ? 'visible' : ''}`}>Carte {cardProps.number}</div>

const gameSetup = setGame({playersCount: 3});
console.log({gameSetup})

function App() {
    return (
        <div className="App">
            <div>
                <h2>Joueurs</h2>
                <ul>
                    {gameSetup.players.map(player => <li>
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
