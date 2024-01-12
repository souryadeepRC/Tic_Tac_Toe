import { useState } from "react"
import GameAnalysis from "../GameAnalysis/GameAnalysis"
import GameDashBoard from "./GameDashBoard/GameDashBoard"
import styles from './GamePlay.module.css' 
import LiveGame from "./LiveGame/LiveGame.js"
/* ---- props --
    gameInputData = {
        First_Player_Name: string
        Round: string
        Second_Player_Name: string
     }   
*/
/*  ----- Game Result ---
    Array of {
            'Round_No' : number
            'Winning_Status' : string,
            'Winner_Name' : string,
            'Winning_Sign' : string
        } 
*/
const GamePlay = (props) => {
    
    const [gameRound, setGameRound] = useState(1)
    const [gameResult, setGameResult] = useState([])
    const [gameStatus, setGameStatus] = useState(true) 

    const retrieveGameResultHandler = (response) => {
        setGameRound(gameRound + 1)
        setGameResult(response)
    }
    const gameCompletionHandler = (response) => {
        setGameStatus(false)
        setGameResult(response)
    }
    const roundLeft = parseInt(props.gameInput.Round) - gameRound
    if (gameStatus) {
        return (
            <div className={styles['game-section']}>
                <LiveGame 
                    gameInput={props.gameInput} 
                    isLastGame={roundLeft === 0}
                    Current_Round={gameRound}
                    gameResult={gameResult}
                    onGameEnd={retrieveGameResultHandler}
                    onGameComplete={gameCompletionHandler} /> 
                <GameDashBoard
                    latestRound={gameRound}
                    roundLeft={roundLeft}
                    gameInput={props.gameInput}
                    result={gameResult}
                />
            </div>
        )
    }else{
        return <GameAnalysis result_details={gameResult} inputData={props.gameInput}/>
    }
}

export default GamePlay