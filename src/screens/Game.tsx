import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { getGameStream, updateGame } from "../services/Firestore";
import FirestoreChess from "../interfaces/firestoreChess";
const Chess = require("chess.js");
const gameName = "Game1";

const Game: React.FC = () => {
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
        chessEngine.load(chessData.getFen());
        setLoaded(true);
      },
    };
    const unsubscribe = getGameStream(gameName, observer);
    return unsubscribe;
  }, []);

  const handleMove = (move: ShortMove) => {
    if (chessEngine.move(move)) {
      setTimeout(() => {
        const moves = chessEngine.moves();

        if (moves.length > 0) {
          chessData.updateFen(chessEngine.fen());
        }
      }, 300);

      chessData.updateFen(chessEngine.fen());
      updateGame(gameName, chessData);
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
    updateGame(gameName, chessData);
  };

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
