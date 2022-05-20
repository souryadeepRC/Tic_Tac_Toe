import styles from './PlayerResult.module.css'

const PlayerResult = (props) => {
    return (
        <div className={styles['player-result']}>
            <p><b>{props.Result.Name}</b> you have played with <b>{props.Result.Sign}</b> sign.</p>

            {
                props.Result.Win_Count === 0
                ? <p>Sorry, you have not achieved any win.</p>
                : <p>You have achieved an Winning percentage of <b>{props.Result.Percentage} %</b> with&nbsp;
                <b>{props.Result.Win_Count}</b> Round{props.Result.Is_Multiple_Win ? 's' : ''} Win</p>
            }

            
        </div>
    )
}

export default PlayerResult