import styles from './Winner.module.css'
const Winner  = (props) => {
    return (
        <div className={styles['previous-result__container']}>
            <p><b>Round : </b>{props.resultData.Round_No} </p> 
                {
                    props.resultData.Winning_Status === 'Draw' 
                    ? <p><b>Match Drawn</b></p>
                    : <p><b>Winner : </b>{props.resultData.Winner_Name}</p>
                }
        </div>
    )
}

export default Winner