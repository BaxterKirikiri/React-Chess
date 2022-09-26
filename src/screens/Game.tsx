import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { getGameStream, updateGame } from "../services/Firestore";
const Chess = require("chess.js");
const gameName = "Game1";

const Game: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  const [fen, setFen] = useState(chess.fen());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = {
      next: (snapshot: any) => {
        chess.load(snapshot.data());
        setFen(chess.fen());
        setLoaded(true);
      },
    };
    const unsubscribe = getGameStream(gameName, observer);
    return unsubscribe;
  }, []);

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      setTimeout(() => {
        const moves = chess.moves();

        if (moves.length > 0) {
          setFen(chess.fen());
        }
      }, 300);

      setFen(chess.fen());
      updateGame(gameName, chess);
      alertGameState();
    }
  };

  const alertGameState = () => {
    if (chess.in_checkmate()) {
      alert("Checkmate!");
    } else if (chess.in_stalemate()) {
      alert("Stalemate!");
    } else if (chess.in_threefold_repetition()) {
      alert("Draw! (3 fold repitition)");
    } else if (chess.insufficient_material()) {
      alert("Draw! (insufficient material)");
    }
  };

  const reset = () => {
    chess.reset();
    setFen(chess.fen());
    updateGame(gameName, chess);
  };

  if (loaded) {
    return (
      //TODO: Make the reset button look nicer
      <div>
        <Chessboard
          width={500}
          position={fen}
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
