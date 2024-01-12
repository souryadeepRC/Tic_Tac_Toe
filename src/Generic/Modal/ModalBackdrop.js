import styles from './ModalBackdrop.module.css'
const ModalBackdrop = (props) => {
    return <div className={styles['backdrop']} onClick={() => props.onBackdropClicked()}></div>
}

export default ModalBackdrop 