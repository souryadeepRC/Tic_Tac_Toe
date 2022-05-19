import { Fragment } from 'react'
import styles from './ModalBackdrop.module.css'
const ModalBackdrop = (props) => {
    return <div className={styles['backdrop']} onClick={() => props.onConfirm()}></div>
}

export default ModalBackdrop 