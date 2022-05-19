import { useState } from 'react'
import HomeContent from './HomeContent'
const AppContent = () => {
    console.log('Load AppContent'); 
    const [gameDetail, setGameDetail] = useState(undefined)   
    const retrieveInputHandler = (response) => {
        console.log(response);
        setGameDetail(response)
    }
    if (gameDetail) {
        return (<div>
                <p>Game Started</p>
                <p>First Player : {gameDetail.First_Player_Name}</p>
                <p>Second Player : {gameDetail.Second_Player_Name}</p>
                <p>Round : {gameDetail.Round}</p>
            </div>)
    } else {
        return(
            <HomeContent onInputEntered={retrieveInputHandler}/>
        )
    }
}

export default AppContent