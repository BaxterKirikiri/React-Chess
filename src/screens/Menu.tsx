import React, { useContext, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import Game from "./Game";

const Menu: React.FC = () => {
  const user = useContext(AuthContext);

  const testGameArray = [
    { name: "Game 1", ID: "Game1" },
    { name: "Game 2", ID: "Game1" },
  ];

  const [inGame, setInGame] = useState(false);

  function goBack() {
    setInGame(false);
  }

  //TODO: Make these buttons look nicer
  if (inGame) {
    return (
      <>
        <Game />
        <button onClick={() => goBack()}>Back to Menu</button>
      </>
    );
  }

  return (
    //TODO: Make these buttons look nicer
    <div className="flex-center">
      <h1>Games</h1>
      {testGameArray.map(({ name, ID }) => (
        <button onClick={() => setInGame(true)}>{name}</button>
      ))}
    </div>
  );
};

export default Menu;
