import Modal from "../Generic/Modal/Modal"
import styles from './GameInputModal.module.css'
import InputBox from "./InputBox"


const GameInputModal = (props) => {
    console.log('Load GameInputModal'); 
    const fetchInputHandler = () => {
        props.onConfirm({
            'First_Player_Name' : 'Player 1',
            'Second_Player_Name' : 'Player 2',
            'Round' : 1 
        })
    }
    return (
        <Modal className={styles['container']} onModalClose={() => props.onModalClose()}> 
                <div className={styles['container__input']}>
                    <InputBox
                        Label='First Player Name'
                        ErrorMsg='Please Enter First Player Name'
                        Type='text' id='FirstPlayer' Value='Player 1'
                    />
                    <InputBox
                        Label='Second Player Name'
                        ErrorMsg='Please Enter Second Player Name'
                        Type='text' id='SecondPlayer' Value='Player 2'
                    />
                    <InputBox
                        Label='Round'
                        ErrorMsg='Please Play at least 1 Round'
                        Type='number' id='GameRound' Value='1'
                        Step='1' MinValue='1'
                    />
                </div>
                <div className={styles['container__btn']}>
                    <button onClick={fetchInputHandler}>Start Game</button>
                </div> 
        </Modal>
    )
}

export default GameInputModal 