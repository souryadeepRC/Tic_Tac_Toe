import styles from  './ModalOverlay.module.css'
const ModalOverlay = (props) => {
    return (
        <div className={`${styles['overlay-container']} `}>
            <div className={styles['overlay__header']}>
                <p className={styles['overlay__header__text']}>{props.Header}</p>
                <button className={styles['overlay__header__close_btn']} onClick={() => props.onModalClose()}>X</button>
            </div>
            <div className={`${props.Style} ${styles['overlay__content']}`}>
                {props.content}
            </div>
        </div>
    )
}

export default ModalOverlay 