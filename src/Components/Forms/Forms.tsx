import React, {useContext, useState} from "react";
import {ThemeContext} from "../../context/context";
import {nanoid} from "nanoid";
import {db} from "../../db/init";
import firebase from "firebase";

const updatePlayerLastSeen = (db: firebase.database.Database, {gameId, pseudo}: { gameId: string, pseudo: string}) => {
    const now = Date.now();
    db.ref(`/gameId/${gameId}/players/${pseudo}`).set({
        lastSeen: now
    });
    setTimeout(() => updatePlayerLastSeen(db, {gameId, pseudo}), 10000);
};

export const SetGame = () => {
    const lol = useContext(ThemeContext);
    const [name, setName] = useState<string>();
    const [id, setId] = useState<string>();
    const [pseudo, setPseudo] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(true);
    return <form onSubmit={event => {
        event.preventDefault();
        const tempId = nanoid();
        setId(tempId)
        db.ref(`/gameId/${tempId}`).set({
            name,
            players: {
                [pseudo]: {
                    name: pseudo,
                    cards: {},
                    currentCard: null
                }
            },
            cards: {}
        }).then(() => {
            // lol.updateId()
        });
        setShowForm(false);
        updatePlayerLastSeen(db, {gameId: tempId, pseudo})
    }}>
        {showForm && <label
            htmlFor="create-game">Créer un jeu</label>}
        {showForm && <input
            id="create-game"
            required
            minLength={3}
            type="text"
            onInput={event => setName(event.currentTarget.value)}/>}
        {showForm && <label
            htmlFor="admin-pseudo">pseudo</label>}
        {showForm && <input
            id="admin-pseudo"
            required
            maxLength={20}
            type="text"
            onInput={event => setPseudo(event.currentTarget.value)}/>}
        {showForm && <input
            type="submit"/>}
        <p>ID de la partie : {id}</p>
    </form>;
};

export const JoinGame = () => {
    const [id, setId] = useState<string>('');
    const [gameName, setGameName] = useState<string>('');
    const [pseudo, setPseudo] = useState<string>('');
    return <form onSubmit={event => {
        event.preventDefault();
        db.ref(`/gameId/${id}`).once('value').then((snapshot) => {
            setGameName(snapshot.val().name);
            updatePlayerLastSeen(db, {gameId: id, pseudo})

        });
        db.ref(`/gameId/${id}/players/${pseudo}`).set({
            name: pseudo,
            cards: {},
            currentCard: null
        });
    }}>
        <label htmlFor="join-game">Joindre un jeu</label>
        <input id="join-game" required type="text" onInput={event => setId(event.currentTarget.value)}/>
        <label htmlFor="pseudo">pseudo</label>
        <input id="pseudo" required maxLength={20} type="text" onInput={event => setPseudo(event.currentTarget.value)}/>
        <input type="submit"/>
        <p>Nom de la partie: {gameName}</p>
    </form>;
};

export const StartGame = () => {
    // const [id, setId] = useState();
    // const [name, setName] = useState('');
    return <form onSubmit={event => {
        event.preventDefault();
        // db.ref(`/gameId/${id}`).once('value').then((snapshot) => {
        // setName(snapshot.val().name)
        // });
    }}>
        <input type="submit" value="Commencer la partie"/>
    </form>;
};
