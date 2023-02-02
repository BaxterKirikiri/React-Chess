import firebase from "firebase";
import "firebase/firestore";
import FirestoreChess from "./firestoreChess";
const { v4: uuidv4 } = require('uuid');
const db = firebase.firestore();
const gameCollection = "Games";
const listCollection = "UserGamesLists"

/************************************
        Firestore Converters
*************************************/
const chessConverter = {
    toFirestore: (instance: FirestoreChess) => {
        return instance.getJSON();
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        return new FirestoreChess(data.FEN, data.Black, data.White, data.History);
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
    return db.collection(gameCollection).doc(gameID).withConverter(chessConverter).onSnapshot(observer);
}
export const updateGame = (gameID: string, game: FirestoreChess) => {
    return db.collection(gameCollection).doc(gameID).withConverter(chessConverter).set(game);
}

/************************************
 UserGameLists Collection Read/Write
*************************************/
export const getUserGameListStream = (userID: string, observer: any) => {
    return db.collection(listCollection).doc(userID).withConverter(userConverter).onSnapshot(observer);
}
export const getUserGameList = (userID: string) => {
    return db.collection(listCollection).withConverter(userConverter).doc(userID).get();
}
export const addGameToUserList = (userID: string, newGame: string) => {
    return db.collection(listCollection).doc(userID).update({
        Games: firebase.firestore.FieldValue.arrayUnion(newGame)
    });
}

/************************************
            Game Creation
*************************************/
export const createGame = (challenger: string, opponent:string) => {
    const newGameID = uuidv4();
    const newGame = new FirestoreChess("new", opponent, challenger, []);

    updateGame(newGameID, newGame);
    addGameToUserList(challenger, newGameID);
    addGameToUserList(opponent, newGameID);
}