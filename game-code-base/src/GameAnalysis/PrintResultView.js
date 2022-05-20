import styles from './PrintResultView.module.css'
import { useState } from 'react';
import AppContent from '../UI/AppContent';
const PrintResultView = (props) => {
    const [gameStatus, setGameStatus] = useState(false)
 
    const WINNING_TYPE = {
        'No_Player_Win': 0,
        'Single_Player_Win': 1,
        'Both_Player_Win': 2
    }
    const getFormattedSystemDate = () => {
        const systemDate = new Date()
        const date = systemDate.toLocaleDateString('en-US', { 'day': 'numeric' })
        const month = systemDate.toLocaleDateString('en-US', { 'month': 'long' })
        const year = systemDate.toLocaleDateString('en-US', { 'year': 'numeric' })
        return `${month} ${date}, ${year}`
    }
    const printCertificateHandler = () => {
        window.print()
    }

    const goBackHandler = () => props.onCertificatePrint()

    const winningMsg = props.result.Win_Type !== WINNING_TYPE.Both_Player_Win ? 'winning' : 'getting tied in'
    const playAgainHandler = () => setGameStatus(true)
   
    if (gameStatus) {
        return <AppContent />
    } else {
        return (
            <div>
                <div className={styles['certificate__outer_box']}>
                    <div className={styles['certificate__inner_box']}>
                        <div className={styles['certificate__content']}>
                            <p className={styles['certificate__content__header']}>Certificate of Appreciation</p>
                            <div className={styles['certificate__content__info']}>
                                <p>We are proud to present this certificate to</p>
                                <p className={styles['certificate__content__info__name']}>{props.result.Name}</p>
                                <p>for {winningMsg}&nbsp;the &nbsp;<b>{props.result.Total_Round}&nbsp;
                                    Round Tic&nbsp;Tac&nbsp;Toe&nbsp;Game</b> with
                                    an winning percentage of <b>{props.result.percentage}&nbsp;%</b></p>
                                <div>
                                </div>
                                <div className={styles['certificate__content__message']}>
                                    <p>Congratulations&nbsp;on your great achievement</p>
                                </div>
                            </div>
                            <p className={styles['certificate__content__date']}>Awarded
                                this {getFormattedSystemDate()}.</p>
                        </div>
                    </div>
                </div>
                <div className={styles['certificate__btn_container']}>
                    <button onClick={printCertificateHandler}>Print Certificate</button>
                    <button onClick={goBackHandler}>Go Back</button>
                    <button onClick={playAgainHandler}>Please Play again</button>
                </div>
            </div>
        )
    }
}

export default PrintResultView