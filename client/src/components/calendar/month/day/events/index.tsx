import React from "react"
import styles from "./styles.module.scss"

interface Props {
    onLoadMore: () => void
    events: any
}

export default function Events(props: Props) {

    if (!props.events) {
        return null
    }

    return (
        <div className={styles.wrap}>
            <ul className={styles.list}>
                {props.events && props.events.events.map((event: any, idx: number) => {
                    if (idx < 3) {
                        return (
                        <li key={event.id} className={styles.item}>
                            <span className={styles.name}>
                                {event.tournament_name}
                            </span>
                            <button className={styles.addButton}>[+]</button>
                        </li>
                    )
                    }
                })}
            </ul>
            <div className={styles.controls}>
                <button
                    onClick={props.onLoadMore}
                    className={styles.moreButton}
                >
                    ...
                </button>
            </div>
        </div>
    )
}
