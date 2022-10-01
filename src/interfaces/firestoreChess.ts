class FirestoreChess{
    FEN: string;
    Black: string;
    White: string;

    constructor(fen: string, playerBlack: string, playerWhite: string){
        this.FEN = fen;
        this.Black = playerBlack;
        this.White = playerWhite;
    }

    getFen(){
        return this.FEN;
    }

    getBlack(){
        return this.Black;
    }

    getWhite(){
        return this.White;
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