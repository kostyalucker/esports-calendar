import React from "react"
import cn from "classnames"
import styles from "./styles.module.scss"
import Events from "./events"

const Day = ({ isToday, day, ...rest }: any) => {
    if (!day.date) {
        return (
            <div
                className={cn(styles.dayWrap, {
                    [styles.isEmpty]: !day
                })}
            />
        )
    }
    
    return (
        <div
            className={cn(styles.dayWrap, {
                [styles.isToday]: isToday
            })}
        >
            <p className={styles.dayNumber}>{day.date && day.date.date()}</p>
            <Events events={day.events && day.events} onLoadMore={() => console.log("load more")}></Events>
        </div>
    )
}

export default Day
