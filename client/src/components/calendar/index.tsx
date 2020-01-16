import React from "react"
import VirtualList from "react-tiny-virtual-list"
// import InfiniteLoader from "react-window-infinite-loader";
import Month from "./month"
import { getCalendar } from "../../utils"
import styles from "./styles.module.scss"

const rowSizes = {
    xs: 1100,
    md: 1500,
    lg: 1700
}

const MonthsList = (props: any) => {
    const [scrollToIndex, setScrollIndex] = React.useState(0)
    const [todayIndex, setScrollTodayIndex] = React.useState(0)
    const { months } = props
    let arr: any = []

    Object.keys(months).forEach(el => {
        arr.push(months[el])
    })

    React.useEffect(() => {
        if (!localStorage.getItem("events")) {
            fetch("http://localhost:5000/api/events", {
                method: "GET"
            })
                .then(res => {
                    return res.json()
                })
                .then(json => {
                    // @ts-ignore
                    localStorage.setItem("events", JSON.stringify(json))
                })
        }
        arr.find((el: any, index: number) => {
            if (el.isToday) {
                setScrollIndex(index)
                setScrollTodayIndex(index)
                return index
            }
            return null
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function clearScrollIndex() {
        if (scrollToIndex !== null) {
            // @ts-ignore
            setScrollIndex(null)
        }
    }

    return (
        <React.Fragment>
            <ul
                style={{
                    position: "relative",
                    margin: 0,
                    padding: 0
                }}
            >
                <button
                    className={styles.goToday}
                    onClick={() => {
                        setScrollIndex(todayIndex)
                    }}
                >
                    NOW
                </button>
                <VirtualList
                    width='100%'
                    height={window.innerHeight}
                    itemCount={arr.length}
                    itemSize={index => {
                        if (arr[index].days.length > 35) {
                            return rowSizes.lg
                        } else if (arr[index].days.length === 35) {
                            return rowSizes.md
                        } else if (arr[index].days.length < 35) {
                            return rowSizes.xs
                        }
                        return 0
                    }} // Also supports variable heights (array or function getter)
                    renderItem={({ index, style }) => (
                        <div
                            key={index}
                            style={style}
                            className={styles.renderItem}
                        >
                            <p className={styles.monthName}>
                                {arr[index].name} {arr[index].year}
                            </p>
                            <Month month={arr[index].days} />
                        </div>
                    )}
                    scrollToIndex={scrollToIndex}
                    onScroll={clearScrollIndex}
                />
            </ul>
        </React.Fragment>
    )
}

interface CalendarProps {
    days?: Array<number>
}

const Calendar = () => {
    const data: any = localStorage.getItem("events")

    return (
        <div className={styles.wrap}>
            <MonthsList months={getCalendar(null, JSON.parse(data).events)} />
        </div>
    )
}

Calendar.propTypes = {}

export default Calendar
