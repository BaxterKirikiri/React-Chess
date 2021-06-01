import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
const Chess = require("chess.js");

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  );
  
  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move: ShortMove) =>{
    if(chess.move(move)){
      setTimeout(() => {
        const moves = chess.moves();

        if(moves.length > 0){
          setFen(chess.fen());
        }
      }, 300);

      setFen(chess.fen());
      alertGameState(chess);
    }
  }

  const alertGameState = (chess: ChessInstance) => {
    if(chess.in_checkmate()){
      alert("Checkmate!");
    } else if (chess.in_stalemate()){
      alert("Stalemate!");
    } else if (chess.in_threefold_repetition()){
      alert("Draw! (3 fold repitition)");
    } else if (chess.insufficient_material()){
      alert("Draw! (insufficient material)");
    }
  } 

  return (
    <div className="flex-center">
      <h1>Baxter Chess</h1>
      <Chessboard
        width={400}
        position= {fen}
        onDrop = { (move) => 
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
      }
      />
    </div>
  )
};

export default App;