
import styles from './HomeContent.module.css'
import './AppContent.css' 
import { useState } from 'react' 
import GameInputModal from '../GameInput/GameInputModal'
import AppContent from './AppContent'

const HomeContent = (props) => {
    console.log('Load HomeContent');
    const [inputModalStatus, setInputModalStatus] = useState(false)
 
    const playBtnHandler = () => {
        console.log('Load a Input Option Modal');
        setInputModalStatus(true)
    }
    const retrieveInputDataHandler = (response) => {
        console.log(response);
        props.onInputEntered(response); 
    }
     
        
            return (
                <div className={styles['app-container']}>
                    <div className={styles['logo-container']}>
                        <img src="Tic_tac_toe.png" alt='App-icon' />
                    </div>
                    <div className={styles['play-btn-container']}>
                        <button onClick={playBtnHandler}>Let's Play</button>
                    </div>
                    { inputModalStatus? 
                        <GameInputModal 
                            onConfirm={retrieveInputDataHandler}
                            onModalClose={() => setInputModalStatus(false)}/> : ''}
                </div>
            )
        
    
    
}

export default HomeContent