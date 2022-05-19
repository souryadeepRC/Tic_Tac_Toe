
import styles from './InputBox.module.css'
const InputBox = (props) => {
    const inputElement =  (props.Type === 'number')
        ?   <input type={props.Type} 
                id={props.Id} value={props.Value}
                step={props.Step} min={props.MinValue}
                placeholder={props.Placeholder} />
        :  <input type={props.Type} 
                id={props.Id} value={props.Value}
                placeholder={props.Placeholder} />
        
    
    return (
        <div className={styles['input-element']}>
            <label>
                <p>{props.Label}</p>
                <p>{props.ErrorMsg}</p>
            </label>
            {inputElement}
        </div>
    )
}

export default InputBox 