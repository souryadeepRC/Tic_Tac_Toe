
import styles from './InputBox.module.css'
const InputBox = (props) => { 
    const inputElement =  (props.param.Type === 'number')
    
        ?   <input type={props.param.Type} 
            id={props.param.ID} value={props.Value}
                step={props.param.Step} min={props.param.Min_Value}
                placeholder={props.param.PlaceHolder} 
                onChange={(event) => props.onInputEnter(event.target.id,event.target.value)}/>

        :  <input type={props.param.Type} 
                id={props.param.ID} value={props.Value}
                placeholder={props.param.PlaceHolder} 
                onChange={(event) => props.onInputEnter(event.target.id,event.target.value)}/>
        
    
    return (
        <div className={styles['input-element']}>
            <label>
                <p>{props.param.Label}</p>
                {props.isInValid ? <p>{props.param.Error_Msg}</p> : ''}
            </label>
            {inputElement}
        </div>
    )
}

export default InputBox 