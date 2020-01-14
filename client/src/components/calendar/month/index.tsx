import React from "react"
import moment from "moment"
import Day from "./day"
import styles from "./styles.module.scss"

interface MonthProps {
    month?: any
}

const weekDaysNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

const Month = (props: MonthProps) => {
    const { month } = props

    return (
        <div>
            <ul className={styles.list}>
                {weekDaysNames.map(name => {
                    return <li className={styles.item}>{name}</li>
                })}
            </ul>
            <ul className={styles.list}>
                {month.map((el: any, index: number) => {
                    return (
                        <li className={styles.item} key={`${el}_${index}`}>
                            <Day isToday={el && el.isSame(moment(), "day")}>
                                {el ? el.date() : ""}
                            </Day>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Month
