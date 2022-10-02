import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { getGameStream, updateGame } from "../services/Firestore";
import FirestoreChess from "../services/firestoreChess";
const Chess = require("chess.js");

const Game: React.FC<{ gameID: string; player: string }> = ({
  gameID,
  player,
}) => {
  /************************************
          State Initialization
  *************************************/
  const [chessEngine] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [chessData, setChessData] = useState<FirestoreChess>(
    new FirestoreChess("", "black", "white")
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = {
      next: (snapshot: any) => {
        setChessData(snapshot.data());
        chessEngine.load(chessData.FEN);
        setLoaded(true);
      },
    };
    const unsubscribe = getGameStream(gameID, observer);
    return unsubscribe;
  }, [chessData, chessEngine, gameID]);

  /************************************
    ChessEngine based state switching 
  *************************************/
  const isPlayersTurn = () => {
    const turn = chessEngine.turn();
    if (turn == "b" && chessData.Black == player) {
      return true;
    } else if (turn == "w" && chessData.White == player) {
      return true;
    } else {
      return false;
    }
  };

  const handleMove = (move: ShortMove) => {
    if (chessEngine.move(move) && isPlayersTurn()) {
      setTimeout(() => {
        const moves = chessEngine.moves();

        if (moves.length > 0) {
          chessData.updateFen(chessEngine.fen());
        }
      }, 300);

      chessData.updateFen(chessEngine.fen());
      updateGame(gameID, chessData);
      alertGameState();
    }
  };

  const alertGameState = () => {
    if (chessEngine.in_checkmate()) {
      alert("Checkmate!");
    } else if (chessEngine.in_stalemate()) {
      alert("Stalemate!");
    } else if (chessEngine.in_threefold_repetition()) {
      alert("Draw! (3 fold repitition)");
    } else if (chessEngine.insufficient_material()) {
      alert("Draw! (insufficient material)");
    }
  };

  const reset = () => {
    chessEngine.reset();
    chessData.updateFen(chessEngine.fen());
    updateGame(gameID, chessData);
  };

  /************************************
          Conditional Rendering
  *************************************/
  if (loaded) {
    return (
      //TODO: Make the reset button look nicer
      <div>
        <Chessboard
          width={500}
          position={chessData.FEN}
          onDrop={(move) =>
            handleMove({
              from: move.sourceSquare,
              to: move.targetSquare,
              promotion: "q",
            })
          }
        />
        <button onClick={() => reset()}>Reset the board</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
};

export default Game;
