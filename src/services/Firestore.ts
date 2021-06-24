import firebase from "firebase";
import "firebase/firestore";
import { ChessInstance } from "chess.js";
const Chess = require("chess.js");
const db = firebase.firestore();

const chessConverter = {
    toFirestore: (instance: ChessInstance) => {
        return{
            Board: instance.fen()
        }
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        return new Chess(data.board);
    } 
}

export const getGameStream = (gameName: string, observer: any) => {
    return db.collection("Games").doc(gameName).withConverter(chessConverter).onSnapshot(observer);
}
export const updateGame = (gameName: string, game: ChessInstance) => {
    return db.collection("Games").doc(gameName).withConverter(chessConverter).set(game);
}