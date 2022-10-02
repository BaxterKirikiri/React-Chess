/**
 * Class to mimic the object structure for each game in Firestore, so that data is easier to pass around
 */
class FirestoreChess{
    FEN: string;
    Black: string;
    White: string;

    constructor(fen: string, playerBlack: string, playerWhite: string){
        this.FEN = fen;
        this.Black = playerBlack;
        this.White = playerWhite;
    }

    updateFen(fen: string){
        this.FEN = fen;
    }

    getJSON() {
        return {
            FEN: this.FEN,
            Black: this.Black,
            White: this.White
        };
    }
}

export default FirestoreChess