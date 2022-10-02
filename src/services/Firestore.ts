import firebase from "firebase";
import "firebase/firestore";
import FirestoreChess from "./firestoreChess";
const db = firebase.firestore();

const chessConverter = {
    toFirestore: (instance: FirestoreChess) => {
        return instance.getJSON();
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        return new FirestoreChess(data.FEN, data.Black, data.White);
    } 
}

const userConverter = {
    toFirestore: (gamesArray: string[]) => {
        return {Games: gamesArray}
    },
    fromFirestore:  (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        return data.Games;
    }
}

//Games
export const getGameStream = (gameID: string, observer: any) => {
    return db.collection("Games").doc(gameID).withConverter(chessConverter).onSnapshot(observer);
}
export const updateGame = (gameID: string, game: FirestoreChess) => {
    return db.collection("Games").doc(gameID).withConverter(chessConverter).set(game);
}

//UserGameLists
export const getUserGameListStream = (userID: string, observer: any) => {
    return db.collection("UserGamesLists").doc(userID).withConverter(userConverter).onSnapshot(observer);
}
