import React, { useState } from "react";
import "./App.css";
import Game from "./screens/Game";

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLocalPlay, setLocalPlay] = useState(false);

  if(authenticated){
    return (
      <div className="flex-center">
        <Game/>
        <button onClick={() => setAuthenticated(false)}>Logout</button>
      </div>
    )
  } else if(isLocalPlay){
    return(
      <div className="flex-center">
        <Game/>
        <button onClick={() => setLocalPlay(false)}>Back</button>
      </div>
    )
  }


  return (
    <div className="flex-center">
      <button onClick={() => setAuthenticated(true)}>Login</button>
      <button onClick={() => setLocalPlay(true)}>Local Play</button>
    </div>
  )
};

export default App;