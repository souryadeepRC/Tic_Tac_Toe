import { useState } from "react"
import GameTable from "./GameTable"
import styles from './LiveGame.module.css'

const LiveGame = (props) => {
    const WINNING_COMBINATION = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    const SIGN_VALUE = {
        'First_Player': 'X',
        'Second_Player': '0'
    }
    const BOX_INITIAL_DATA = [
        { 'Position': 1, 'Value': '', Status: false },
        { 'Position': 2, 'Value': '', Status: false },
        { 'Position': 3, 'Value': '', Status: false },
        { 'Position': 4, 'Value': '', Status: false },
        { 'Position': 5, 'Value': '', Status: false },
        { 'Position': 6, 'Value': '', Status: false },
        { 'Position': 7, 'Value': '', Status: false },
        { 'Position': 8, 'Value': '', Status: false },
        { 'Position': 9, 'Value': '', Status: false }
    ]
    const currentRound = props.Current_Round
    const [currentTurn, setCurrentTurn] = useState(props.gameInput.First_Player_Name)
    const [boxLeft, setBoxLeft] = useState(9)
    const [gameBoxValue, setGameBoxValue] = useState(BOX_INITIAL_DATA)


    /**=========  Game Result Calculation Logic  ============== */
    const checkisSameSignPresent = (positionList) => {

        if ((gameBoxValue[positionList[0]].Value !== '') &&
            (gameBoxValue[positionList[0]].Value === gameBoxValue[positionList[1]].Value) &&
            (gameBoxValue[positionList[0]].Value === gameBoxValue[positionList[2]].Value)) {
            gameBoxValue[positionList[0]].Status = true
            gameBoxValue[positionList[1]].Status = true
            gameBoxValue[positionList[2]].Status = true
            return gameBoxValue[positionList[0]].Value
        } else {
            return ''
        }
    }
    const getWinnerSign = () => {
        for (const combination of WINNING_COMBINATION) {
            const winnerSign = checkisSameSignPresent(combination)
            if (winnerSign !== '') {
                return winnerSign
            }
        }
        return ''
    }
    /* Response => {
            'Winning_Status' : '',
            'Winner_Name' : '',
            'Winning_Sign' : ''
        } */
    const evaluateGameResult = () => {

        const winnerSign = getWinnerSign()
        let result = {
            'Winning_Status': '',
            'Winner_Name': '',
            'Winning_Sign': ''
        }
        if (winnerSign !== '') {
            const winnerName = winnerSign === SIGN_VALUE.First_Player ?
                props.gameInput.First_Player_Name : props.gameInput.Second_Player_Name
            result = {
                'Winning_Status': 'Win',
                'Winner_Name': winnerName,
                'Winning_Sign': winnerSign
            }
        } else if (boxLeft === 0) {
            result.Winning_Status = 'Draw'
        }
        return result
    }

    /**=========  Modifying Current Turn and Sign  ============== */
    const isFirstPlayerTurn = currentTurn === props.gameInput.First_Player_Name
    const currentSign = isFirstPlayerTurn ? SIGN_VALUE.First_Player : SIGN_VALUE.Second_Player

    /**=========  Evaluating Current Combination  ============== */
    const result = evaluateGameResult()
    const isGameEnd = result.Winning_Status !== ''

    const getUpdatedResult = (result) => {
        props.gameResult.push({
            'Round_No': currentRound,
            ...result
        })
        return props.gameResult
    }

    /**=========  Click Handler | Go to Next Round  ============== */
    const onGameEndHandler = () => {
        props.onGameEnd(getUpdatedResult(result))
        setGameBoxValue(BOX_INITIAL_DATA)
        setBoxLeft(9)
    }

    /**=========  Click Handler | Go to Show Analysis  ============== */
    const onShowAnalysisHandler = () => props.onGameComplete(getUpdatedResult(result))

    /**=========  Click Handler | on Each Box Click  ============== */
    const itemClickHandler = (response) => {
        setGameBoxValue((gameBoxValue) => {
            gameBoxValue[response.ID].Value = response.Value
            return gameBoxValue
        })
        setBoxLeft(boxLeft - 1)
        setCurrentTurn(isFirstPlayerTurn ?
            props.gameInput.Second_Player_Name : props.gameInput.First_Player_Name)
    }

    let gameCurrentStatus =  <div className={styles['game-playground__match_info']}>
                                <p><b>Turn&nbsp;:&nbsp;</b>{currentTurn}</p>
                                <p><b>Sign&nbsp;:&nbsp;</b><span>{currentSign}</span></p>
                            </div>
    if (isGameEnd) {
        gameCurrentStatus = result.Winning_Status === 'Draw'
            ? <p><b>Match Draw</b></p>
            : <p><b>Winner  : </b>{result.Winner_Name}</p>
    }
    return (
        <div className={styles['game-playground']}>
            <div className={styles['game-playground__header']}>
                <div className={styles['game-playground__status']}>
                    <p><b>Round : </b><span>{props.Current_Round} </span></p>
                    <hr />
                    {gameCurrentStatus}
                </div>
                <div className={styles['game-playground__btn-container']}>
                    {isGameEnd && !props.isLastGame ? <button onClick={onGameEndHandler}>Start Next Round</button> : ''}
                    {isGameEnd && props.isLastGame ? <button onClick={onShowAnalysisHandler}>Show Analysis</button> : ''}
                </div>
            </div>
            <GameTable items={gameBoxValue} currentSign={currentSign} onItemClick={itemClickHandler} />
        </div>
    )
}

export default LiveGame