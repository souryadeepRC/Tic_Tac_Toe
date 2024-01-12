import styles from './GameDashBoard.module.css'
import GameResult from './GameResult'

const GameDashBoard= (props) => {
    let gameRoundLeftStatus = <p>Game End</p>
    if (props.roundLeft > 0) {
        gameRoundLeftStatus = <p><b>Round Left : </b>{props.roundLeft}</p>
    } else if (props.roundLeft === 0) {
        gameRoundLeftStatus = <p>Last Round Running</p>
    }
    return (
        <div className={styles['game-dashboard']}>
            <div className={styles['game-input-detail']}>
                <p><b>First Player ( X )&nbsp;:&nbsp;</b><span>{props.gameInput.First_Player_Name}</span></p>
                <p><b>Second Player ( 0 )&nbsp;:&nbsp;</b><span>{props.gameInput.Second_Player_Name}</span></p>
                <p><b>Total Game Round&nbsp;:&nbsp;</b><span>{props.gameInput.Round}</span></p>
                {gameRoundLeftStatus}
            </div>
            <div>
                <GameResult result={props.result} />
            </div>
        </div>
    )
}

export default GameDashBoard