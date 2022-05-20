import Winner from "./Winner";
import styles from './GameResult.module.css'
const GameResult = (props) => { 
  
    return ( 
        <div className={styles['previous-round-result']}>
            <p className={styles['previous-round-result__header']}>Previous Round Result</p>
            <div className={styles['previous-round-result__content']}>
                {props.result.map(result => 
                    <Winner 
                    key={result.Round_No}
                    resultData = {result}
                />)}
            </div>
        </div> 
    )
}
export default GameResult 