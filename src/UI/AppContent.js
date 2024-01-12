import { useState } from 'react'
import GamePlay from '../GamePlay/GamePlay';
import HomeContent from './HomeContent'
const AppContent = () => { 
    const [gameDetail, setGameDetail] = useState(undefined)   
    const retrieveInputHandler = (response) => {
        setGameDetail(response)
    }
    if (gameDetail) {
        return <GamePlay gameInput={gameDetail}/>
    } else {
        return(
            <HomeContent onInputEntered={retrieveInputHandler}/>
        )
    }
}

export default AppContent