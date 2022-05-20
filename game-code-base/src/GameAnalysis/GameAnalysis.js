import { useState } from 'react'
import AppContent from '../UI/AppContent'
import styles from './GameAnalysis.module.css'
import PlayerResult from './PlayerResult'
import PrintResultView from './PrintResultView'
const GameAnalysis = (props) => {
    const [printMode, setPrintMode] = useState(false)
    const [gameStatus, setGameStatus] = useState(false)
    const PLAYER_SIGN = {
        'First_Player' : 'X',
        'Second_Player' : '0'
    }
    const WINNING_TYPE = {
        'No_Player_Win' : 0,
        'Single_Player_Win' : 1,
        'Both_Player_Win' : 2
    }
    const calculateWinPercentage = (obtainedValue,totalValue) => {
        const percentage = ((obtainedValue / totalValue) * 100) 
        return percentage % 1===0 ? percentage : percentage.toFixed(2)
    }
 
    const performWinnerCalculation = () => {
        const totalPlayedRound = parseInt(props.inputData.Round)
        let firstPlayerCount = 0, secondPlayerCount = 0
        let drawCount = 0
        props.result_details.forEach(result => {
            if (result.Winning_Status === 'Draw') {
                drawCount++
            } else {
                if (result.Winning_Sign === PLAYER_SIGN.First_Player) {
                    firstPlayerCount++
                } else if (result.Winning_Sign === PLAYER_SIGN.Second_Player) {
                    secondPlayerCount++
                }
            }
        });
        let winner = ''
        let winnerWinCount = 0
        let winType = WINNING_TYPE.No_Player_Win
         
        if(drawCount !== totalPlayedRound){
            if (firstPlayerCount !== secondPlayerCount) {
                winType =WINNING_TYPE.Single_Player_Win
                if (firstPlayerCount > secondPlayerCount) {
                    winner = props.inputData.First_Player_Name
                    winnerWinCount = firstPlayerCount
                } else {
                    winner = props.inputData.Second_Player_Name
                    winnerWinCount = secondPlayerCount
                }
            }else{
                winType = WINNING_TYPE.Both_Player_Win
                winnerWinCount = firstPlayerCount
                winner = `${props.inputData.First_Player_Name} & ${props.inputData.Second_Player_Name}`
            }
        }
       
        return {
            'Total_Round': totalPlayedRound,
            'Draw_Count': drawCount,
            'Win_Type': winType,
            'Winner_Detail' : {
                'Name': winner,
                'Count' : winnerWinCount,
                'Is_Multiple_Win': winnerWinCount > 1,
                'Percentage': calculateWinPercentage(winnerWinCount,totalPlayedRound)
            },
            'First_Player_Detail': {
                'Name': props.inputData.First_Player_Name,
                'Sign': PLAYER_SIGN.First_Player,
                'Win_Count': firstPlayerCount,
                'Is_Multiple_Win': firstPlayerCount > 1,
                'Percentage': calculateWinPercentage(firstPlayerCount,totalPlayedRound)
            },
            'Second_Player_Detail': {
                'Name': props.inputData.Second_Player_Name,
                'Sign': PLAYER_SIGN.Second_Player,
                'Win_Count': secondPlayerCount,
                'Is_Multiple_Win': secondPlayerCount > 1,
                'Percentage': calculateWinPercentage(secondPlayerCount,totalPlayedRound)
            }
        }
    }
   
    const analysis = performWinnerCalculation()
    const printCertificateHandler = () => {
        setPrintMode(true)
    }
    const onCertificatePrintHandler = () => {
        setPrintMode(false)
    }
    const playAgainHandler = () => setGameStatus(true)

    /**============   Congratulations Message Logic Seperations  ============= */
    let congratulatioMsg = <p>Sorry we haven't found any winner. Well Played Both of you.</p>
    if(analysis.Win_Type !== WINNING_TYPE.No_Player_Win){
        if(analysis.Win_Type === WINNING_TYPE.Single_Player_Win){
            congratulatioMsg = <p>Congratulations <b>{analysis.Winner_Detail.Name}</b> for your well-deserved victory.</p>
        }else{
            congratulatioMsg = <p>Congratulations <b>{analysis.First_Player_Detail.Name}</b> and&nbsp;
                            <b>{analysis.Second_Player_Detail.Name}</b>
                            &nbsp;on your well-deserved success. Both of you played so well that 
                            we are unable to find a single champion.</p>
        }
    }

     
    if(gameStatus){
        return <AppContent />
    }else if (printMode) {
        return <PrintResultView 
                    result={{
                        'Name' : analysis.Winner_Detail.Name,
                        'Total_Round' : analysis.Total_Round,
                        'Win_Type' : analysis.Win_Type,
                        'percentage' : analysis.Winner_Detail.Percentage
                    }} 
                    onCertificatePrint ={onCertificatePrintHandler}
                />
    } else {
        return (
            <div className={styles['game-analysis']}>
               
                <h2 className={styles['game-analysis__header']}>Match Analysis</h2>
                <hr />
                <div className={styles['game-analysis__count']}>
                    <p><b>Total Round Played : </b>{analysis.Total_Round}</p>
                    {analysis.Draw_Count === 0 ? '' : <p><b>Draw : </b>{analysis.Draw_Count}</p>}
                </div>
                <hr />
                <PlayerResult Result={analysis.First_Player_Detail} />
                <PlayerResult Result={analysis.Second_Player_Detail} />

                <div className={styles['game-analysis__message']}>{congratulatioMsg}</div>
                <div className={styles['game-analysis__button-container']}>
                    {analysis.Win_Type !==WINNING_TYPE.No_Player_Win
                        ? <button onClick={printCertificateHandler}>Generate Certificate</button> : ''}
                    <button onClick={playAgainHandler}>Please Play&nbsp;again</button>
                </div>


            </div>
        )
    }
}

export default GameAnalysis