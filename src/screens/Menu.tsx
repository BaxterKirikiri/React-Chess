import React, {useState} from "react";
import Game from "./Game";

const Menu: React.FC = () => {
    const [isLocalPLay, setLocalPlay] = useState(false);
    const [isOnlinePlay, setOnlinePlay] = useState(false);

    if(isLocalPLay){
        return <Game/>
    } else if(isOnlinePlay){
        return <Game/>
    }

    return(
        <>
            <button onClick={() => setOnlinePlay(true)}>Play Online (not implemented)</button>
            <button onClick={() => setLocalPlay(true)}>Local Play</button>
        </>
    )
}

export default Menu;