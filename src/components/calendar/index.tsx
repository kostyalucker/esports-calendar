import React from "react";
import VirtualList from "react-tiny-virtual-list";
// import InfiniteLoader from "react-window-infinite-loader";
import Month from "./month";
import { getCalendar } from "../../utils";
import styles from "./styles.module.scss";

interface PropsRow {
  key?: any;
  index?: number;
}

const MonthsList = (props: any) => {
  const [scrollToIndex, setScrollIndex] = React.useState(0);
  const [todayIndex, setScrollTodayIndex] = React.useState(0);
  const { months } = props;
  let arr: any = [];

  Object.keys(months).forEach(el => {
    arr.push(months[el]);
  });

  React.useEffect(() => {
    arr.find((el: any, index: number) => {
      if (el.isToday) {
        setScrollIndex(index);
        setScrollTodayIndex(index);
        return index;
      }
      return null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearScrollIndex() {
    if (scrollToIndex !== null) {
      // @ts-ignore
      setScrollIndex(null);
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
            setScrollIndex(todayIndex);
          }}
        >
          NOW
        </button>
        <VirtualList
          width="100%"
          height={window.innerHeight}
          itemCount={arr.length}
          itemSize={1050} // Also supports variable heights (array or function getter)
          renderItem={({ index, style }) => (
            <div key={index} style={style}>
              <p className={styles.monthName}>
                {arr[index].name} {arr[index].year}
              </p>
              <Month month={arr[index].days}></Month>
            </div>
          )}
          scrollToIndex={scrollToIndex}
          onScroll={clearScrollIndex}
        />
      </ul>
    </React.Fragment>
  );
};

interface CalendarProps {
  days?: Array<number>;
}

const Calendar = () => {
  return (
    <div className={styles.wrap}>
      <MonthsList months={getCalendar(null)} />
    </div>
  );
};

Calendar.propTypes = {};

export default Calendar;
