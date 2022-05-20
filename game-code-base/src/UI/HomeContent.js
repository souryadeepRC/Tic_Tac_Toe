
import styles from './HomeContent.module.css'
import './AppContent.css'
import { useState } from 'react'
import GameInputModal from '../GameInput/GameInputModal'
import logo from '../images/Tic_tac_toe.png'

const HomeContent = (props) => {
    const [inputModalStatus, setInputModalStatus] = useState(false)

    return (
        <div className={styles['app-container']}>
            <div className={styles['logo-container']}>
                <img src={logo} alt='App-icon' />
            </div>
            <div className={styles['play-btn-container']}>
                <button onClick={() => setInputModalStatus(true)}>Let's Play</button>
            </div>
            {inputModalStatus ?
                <GameInputModal
                    onConfirm={(response) => props.onInputEntered(response)}
                    onModalClose={() => setInputModalStatus(false)}
                    onBackdropClicked={() => setInputModalStatus(false)} /> : ''}
        </div>
    )
}

export default HomeContent