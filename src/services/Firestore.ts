import firebase from "firebase";
import "firebase/firestore";
import FirestoreChess from "./firestoreChess";
const db = firebase.firestore();

/************************************
        Firestore Converters
*************************************/
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

/************************************
    Games Collection Read/Write
*************************************/
export const getGameStream = (gameID: string, observer: any) => {
    return db.collection("Games").doc(gameID).withConverter(chessConverter).onSnapshot(observer);
}
export const updateGame = (gameID: string, game: FirestoreChess) => {
    return db.collection("Games").doc(gameID).withConverter(chessConverter).set(game);
}

/************************************
 UserGameLists Collection Read/Write
*************************************/
export const getUserGameListStream = (userID: string, observer: any) => {
    return db.collection("UserGamesLists").doc(userID).withConverter(userConverter).onSnapshot(observer);
}
export const updateUserGameList = (userID: string, gamesArray: string[]) => {
    return db.collection("UserGameLists").doc(userID).withConverter(userConverter).set(gamesArray);
}