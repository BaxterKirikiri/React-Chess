import React, { useState, useEffect } from "react";
import { getUserGameListStream } from "../services/Firestore";
import { gameListInstance } from "../services/gameListInstance";
import CreateGame from "./CreateGame";
import Game from "./Game";

//TODO: Make the buttons look nicer

const Menu: React.FC<{ uid: string }> = ({ uid }) => {
  /************************************
          State Initialization
  *************************************/
  const [inGame, setInGame] = useState(false);
  const [creatingNewGame, setCreatingNewGame] = useState(false);
  const [gameList] = useState<gameListInstance[]>([]);
  const [gamesLoaded, setGamesLoaded] = useState(false);
  const [selectedGameID, setSelectedGameID] = useState("");

  useEffect(() => {
    const observer = {
      next: (snapshot: any) => {
        snapshot.data().forEach((ID: string) => {
          gameList.push(new gameListInstance(ID, ID));
        });
        setGamesLoaded(true);
      },
    };
    const unsubscribe = getUserGameListStream(uid, observer);
    return unsubscribe;
  }, [uid, gameList]);

  /************************************
            State swithcing
  *************************************/
  const enterGame = (gid: string) => {
    setSelectedGameID(gid);
    setInGame(true);
  };

  const createNewGame = () => {
    setCreatingNewGame(true);
  };

  const backToMenu = () => {
    setInGame(false);
    setCreatingNewGame(false);
    setSelectedGameID("");
  };

  /************************************
          Conditional Rendering
  *************************************/
  if (inGame) {
    return (
      <>
        <Game gameID={selectedGameID} player={uid} />
        <button onClick={backToMenu}>Back to Menu</button>
      </>
    );
  }

  if (creatingNewGame) {
    return (
      <div>
        <CreateGame />
        <button onClick={backToMenu}>Back to Menu</button>
      </div>
    );
  }

  if (gamesLoaded) {
    return (
      <div className="flex-center">
        <h1>Games</h1>
        {gameList.map((instance: gameListInstance) => (
          <button onClick={() => enterGame(instance.gid)}>
            {instance.name}
          </button>
        ))}
        <button onClick={createNewGame}>New Game</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Loading existing games...</h2>
      </div>
    );
  }
};

export default Menu;
