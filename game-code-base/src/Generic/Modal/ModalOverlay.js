import styles from  './ModalOverlay.module.css'
const ModalOverlay = (props) => {
    return (
        <div className={`${styles['overlay-container']} `}>
            <div className={styles['overlay__header']}>
                <p className={styles['overlay__header__text']}>Modal Header</p>
                <p onClick={() => props.onModalClose()}>Close</p>
            </div>
            <div className={`${props.Style} ${styles['overlay__content']}`}>
                {props.content}
            </div>
        </div>
    )
}

export default ModalOverlay 