import React from "react"
import cn from "classnames"
import moment from "moment"
import Day from "./day"
import styles from "./styles.module.scss"

interface MonthProps {
    month?: any
}

const weekDaysNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

const Month = (props: MonthProps) => {
    const { month } = props
    // el && el.date.isSame(moment(), "day")
    return (
        <div>
            <ul className={cn(styles.list, styles.head)}>
                {weekDaysNames.map((name, idx) => {
                    return <li key={`${name}_${idx}`} className={styles.item}>{name}</li>
                })}
            </ul>
            <ul className={styles.list}>
                {month.map((el: any, index: number) => {
                    return (
                        <li className={cn(styles.item)} key={`${el}_${index}`}>
                            <Day
                                isToday={false}
                                // day={(el && el.date) ? el.date : ""}
                                day={el}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Month
