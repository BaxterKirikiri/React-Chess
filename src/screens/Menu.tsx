import React, {useState} from "react";
import Game from "./Game";

const Menu: React.FC = () => {
    const [isLocalPLay, setLocalPlay] = useState(false);
    const [isOnlinePlay, setOnlinePlay] = useState(false);

    function goBack() {
        setLocalPlay(false);
        setOnlinePlay(false);
    }

    if(isLocalPLay){
        return (
            <>
                <Game/>
                <button onClick={() => goBack()}>Back to Menu</button>
            </>
        )
    } else if(isOnlinePlay){
        return(
            <>
                <Game/>
                <button onClick={() => goBack()}>Back to Menu</button>
            </>
        ) 
    }

    return(
        <>
            <button onClick={() => setOnlinePlay(true)}>Play Online (not implemented)</button>
            <button onClick={() => setLocalPlay(true)}>Local Play</button>
        </>
    )
}

export default Menu;