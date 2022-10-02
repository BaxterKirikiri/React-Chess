import React, { useState, useEffect } from "react";
import { getUserGameListStream } from "../services/Firestore";
import { gameListInstance } from "../services/gameListInstance";
import Game from "./Game";

const Menu: React.FC<{ uid: string }> = ({ uid }) => {
  const [inGame, setInGame] = useState(false);
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

  function enterGame(gid: string) {
    setSelectedGameID(gid);
    setInGame(true);
  }

  function goBack() {
    setInGame(false);
    setSelectedGameID("");
  }

  //TODO: Make these buttons look nicer
  if (inGame) {
    console.log(gameList);
    console.log(selectedGameID);
    return (
      <>
        <Game gameID={selectedGameID} />
        <button onClick={() => goBack()}>Back to Menu</button>
      </>
    );
  }

  if (gamesLoaded) {
    return (
      //TODO: Make these buttons look nicer
      <div className="flex-center">
        <h1>Games</h1>
        {gameList.map((instance: gameListInstance) => (
          <button onClick={() => enterGame(instance.gid)}>
            {instance.name}
          </button>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
};

export default Menu;
