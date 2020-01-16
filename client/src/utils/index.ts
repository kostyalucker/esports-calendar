import moment from "moment"

const MONTHS_OFFSET = 96

const getMonthDays = (date: any, events: any) => {
    const startDate = date
        .clone()
        .startOf("month")
        .startOf("isoWeek")
    const endDay = date
        .clone()
        .endOf("month")
        .endOf("isoWeek")

    const days = []
    const now = startDate.clone()

    while (now.isSameOrBefore(endDay)) {
        const res = now.month() === date.month() ? now.clone() : null
        const dayData: any = {
            date: res
        }
        events.forEach((el: any, idx: number) => {
            if (
                moment(events[idx].date)
                    .startOf("day")
                    .isSame(now.startOf("day"))
            ) {
                console.log(el)
                dayData.events = el
            }
        })
        now.add(1, "day")
        days.push(dayData)
    }
    return days
}

export const CALENDAR_START_DATE = moment().subtract(MONTHS_OFFSET, "months")

export const getCalendar = (date: any, events: any) => {
    let start
    const result: any = {}
    const eventsArr = Object.keys(events).map(el => {
        return events[el]
    })

    start = date || CALENDAR_START_DATE

    const startClone = start.clone()
    const endDate = moment()
        .clone()
        .add(MONTHS_OFFSET, "months")
    let i = 0

    while (startClone.isBefore(endDate)) {
        i += 1

        result[i] = {
            isToday:
                moment().isSame(startClone, "month") &&
                moment().isSame(startClone, "year"),
            name: startClone.format("MMMM"),
            year: startClone.format("YYYY"),
            days: getMonthDays(startClone, eventsArr)
        }

        startClone.add(1, "month")
    }

    return result
}
