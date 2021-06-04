import React, {useState} from "react";
import Game from "./Game";

const Menu: React.FC = () => {
    const [isLocalPLay, setLocalPlay] = useState(false);
    const [isOnlinePlay, setOnlinePlay] = useState(false);

    function goBack() {
        setLocalPlay(false);
        setOnlinePlay(false);
    }

    //TODO: Make these buttons look nicer
    if(isLocalPLay){
        return (
            <>
                <Game/>
                <button onClick={() => goBack()}>Back to Menu</button>
            </>
        )
    } else if(isOnlinePlay){ //TODO: implement online play
        return(
            <>
                <Game/>
                <button onClick={() => goBack()}>Back to Menu</button>
            </>
        ) 
    }

    return(  //TODO: Make these buttons look nicer
        <div className="flex-center">
            <button onClick={() => setOnlinePlay(true)}>Play Online</button>
            <button onClick={() => setLocalPlay(true)}>Local Play</button>
        </div>
    )
}

export default Menu;