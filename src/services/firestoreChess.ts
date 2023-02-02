/**
 * Class to mimic the object structure for each game in Firestore, so that data is easier to pass around
 */
class FirestoreChess{
    FEN: string;
    Black: string;
    White: string;
    History: string[];

    constructor(fen: string, playerBlack: string, playerWhite: string, history: string[]){
        this.FEN = fen;
        this.newGame();
        this.Black = playerBlack;
        this.White = playerWhite;
        this.History = history;
    }

    newGame(){
        if(this.FEN == "new"){
            this.FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        }
    }
  
    updateFen(fen: string){
        this.FEN = fen;
    }

    updateHistory(move: string){
        this.History.push(move);
    }

    resetHistory(){
        this.History = [];
    }

    getJSON() {
        return {
            FEN: this.FEN,
            Black: this.Black,
            White: this.White,
            History: this.History
        };
    }
}

export default FirestoreChess