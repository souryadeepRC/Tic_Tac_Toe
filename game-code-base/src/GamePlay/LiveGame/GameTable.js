import styles from './GameTable.module.css'

const GameTable = (props) => {

    const OPEN_BORDER_CLASS_LIST = [
        `${styles['box-item__border-right']} ${styles['box-item__border-bottom']}`,
        `${styles['box-item__border-right']} ${styles['box-item__border-bottom']}`,
        `${styles['box-item__border-bottom']}`,

        `${styles['box-item__border-right']} ${styles['box-item__border-bottom']}`,
        `${styles['box-item__border-right']} ${styles['box-item__border-bottom']}`,
        `${styles['box-item__border-bottom']}`,

        `${styles['box-item__border-right']}`,
        `${styles['box-item__border-right']}`,
        ''
    ]
    const WINNER_BOX_BACKGROUND_COLOR = '#98d998'
    const itemClickHandler = (event) => {
        if (event.target.innerText === '') {
            event.target.innerText = props.currentSign
            props.onItemClick({
                'ID': parseInt(event.target.id),
                'Position': parseInt(event.target.id) + 1,
                'Value': event.target.innerText
            })
        }
    }

    return (
        <div className={styles['box-container']}>
            {
                props.items.map((item, index) => {
                    return (
                        <p
                            key={item.Position}
                            id={item.Position - 1}
                            className={`${styles['box-container__item']} ${OPEN_BORDER_CLASS_LIST[index]}`}
                            style={item.Status ? { background: WINNER_BOX_BACKGROUND_COLOR } : {}}
                            onClick={itemClickHandler}
                        >{item.Value}</p>)

                })
            }
        </div>
    )
}

export default GameTable