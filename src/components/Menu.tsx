import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getUserGameListStream } from "../services/Firestore";
import CreateGame from "./CreateGame";
import Game from "./Game";

//TODO: Make the buttons look nicer

const Menu: React.FC<{ uid: string }> = ({ uid }) => {
  /************************************
          State Initialization
  *************************************/
  //View management
  const [inGame, setInGame] = useState(false);
  const [creatingNewGame, setCreatingNewGame] = useState(false);
  const [gamesLoaded, setGamesLoaded] = useState(false);

  //Game data
  const [gameList] = useState<string[]>([]);
  const [selectedGameID, setSelectedGameID] = useState("");

  useEffect(() => {
    const observer = {
      next: (snapshot: any) => {
        snapshot.data().forEach((ID: string) => {
          gameList.push(ID);
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

  const goToCreateNewGame = () => {
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
        <Button onClick={backToMenu} variant="secondary">
          Back to Menu
        </Button>
      </>
    );
  }

  if (creatingNewGame) {
    return (
      <div>
        <CreateGame challenger={uid} callback={backToMenu} />
        <Button onClick={backToMenu} variant="secondary">
          Back to Menu
        </Button>
      </div>
    );
  }

  if (gamesLoaded) {
    return (
      <div className="flex-center">
        <h1>Games</h1>
        {gameList.map((gid: string) => (
          <Button onClick={() => enterGame(gid)} variant="secondary">
            {gid}
          </Button>
        ))}
        <Button onClick={goToCreateNewGame}>New Game</Button>
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
