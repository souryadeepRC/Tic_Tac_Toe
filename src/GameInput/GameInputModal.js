import { useState } from "react";
import Modal from "../Generic/Modal/Modal"
import styles from './GameInputModal.module.css'
import InputBox from "./InputBox"


const GameInputModal = (props) => { 
    const DEFAULT_INPUT_VALUE = {
        'First_Player_Name': 'A',
        'Second_Player_Name': 'B',
        'Round': '5'
    }
    const DEFAULT_INPUT_DETAIL = {
        'First_Player_Name': {
            'ID' : 'FirstPlayer', 'Type' : 'text','KeyName' :'First_Player_Name',
            'Label' : 'First Player Name', 'Error_Msg' : 'Please Enter First Player Name',
            'PlaceHolder' : 'First Player Name'
        },
        'Second_Player_Name': {
            'ID' : 'SecondPlayer', 'Type' : 'text','KeyName' :'Second_Player_Name',
            'Label' : 'Second Player Name', 'Error_Msg' : 'Please Enter Second Player Name',
            'PlaceHolder' : 'Second Player Name'
        },
        'Round': {
            'ID' : 'GameRound', 'Type' : 'number','KeyName' :'Round',
            'Label' : 'Round', 'Error_Msg' : 'Please Play at least 1 Round',
            'PlaceHolder' : 'Round',
            'Step' : '1' , 'Min_Value' : '1'
        }  
    }
    const [userInput,setUserInput] = useState(DEFAULT_INPUT_VALUE)
  
    const modifyInputValue = (id,value,element) => id === DEFAULT_INPUT_DETAIL[element].ID ? value : userInput[element]

    const updateInputHandler = (id,value) => { 
        setUserInput({
            'First_Player_Name': modifyInputValue(id,value,DEFAULT_INPUT_DETAIL.First_Player_Name.KeyName) ,
            'Second_Player_Name': modifyInputValue(id,value,DEFAULT_INPUT_DETAIL.Second_Player_Name.KeyName),
            'Round': modifyInputValue(id,value,DEFAULT_INPUT_DETAIL.Round.KeyName)
        })
    }
    const isInValidInput =  ( userInput.First_Player_Name === '' ||
            userInput.Second_Player_Name === '' ||  userInput.Round === '' ||
            parseInt(userInput.Round) <= 0 )
    
    return (
        <Modal className={styles['container']} 
            Header='Fill Customize Info'
            onModalClose={() => props.onModalClose()} 
            onBackdropClicked ={() => props.onBackdropClicked()}>
            <div className={styles['container__input']}>
                <InputBox
                    param={DEFAULT_INPUT_DETAIL.First_Player_Name}
                    isInValid={userInput.First_Player_Name===''}
                    Value={userInput.First_Player_Name}
                    onInputEnter ={updateInputHandler}
                />
                <InputBox
                    param={DEFAULT_INPUT_DETAIL.Second_Player_Name}
                    isInValid={userInput.Second_Player_Name===''}
                    Value={userInput.Second_Player_Name}
                    onInputEnter ={updateInputHandler}
                />
                <InputBox
                    param={DEFAULT_INPUT_DETAIL.Round}
                    isInValid={userInput.Round==='' || parseInt(userInput.Round) <= 0}
                    Value={userInput.Round}
                    onInputEnter ={updateInputHandler}
                />
            </div>
            <div className={styles['container__btn']}>
                {isInValidInput ? '' : <button onClick={() => props.onConfirm(userInput)}>Start Game</button>}
            </div>
        </Modal>
    )
}

export default GameInputModal 