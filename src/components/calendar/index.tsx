import React from "react";
import {
  List,
  AutoSizer,
  WindowScroller,
  InfiniteLoader
} from "react-virtualized";
import Month from "./month";
import { getCalendar } from "../../utils";

interface PropsRow {
  key?: any;
  index?: number;
}

const MonthsList = (props: any) => {
  const [scrollToIndex, setScrollIndex] = React.useState(3);
  const { months } = props;
  let arr: any = [];

  Object.keys(months).forEach(el => {
    arr.push(months[el]);
  });


  React.useEffect(() => {
    console.log(props)
  })

  function rowRenderer({ key, index, style, isScrolling, isVisible }: any) {
    if (isScrolling && !isVisible) {
      return (
        <p key={key} style={style}>
          ...Loading
        </p>
      );
    }
    // @ts-ignore
    console.log("update");
    return (
      <div key={key} style={style}>
        <p>
          {arr[index].name}
          {index}
        </p>
        <Month month={arr[index].days}></Month>
      </div>
    );
  }

  function isRowLoaded({ index }: { index: number }) {
    return !!months[index];
  }

  function handleloadMoreRows({
    startIndex,
    stopIndex
  }: {
    startIndex: number;
    stopIndex: number;
  }) {
    console.log("load more", startIndex, stopIndex);
    return new Promise(resolve => {
      return resolve();
    });
  }

  function clearScrollToIndex() {
    setScrollIndex(-1);
  }

  function handleClick() {
    setScrollIndex(20);
  }
  return (
    <ul
      style={{
        position: "relative",
        margin: 0,
        padding: 0
      }}
    >
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows => handleloadMoreRows(loadMoreRows)}
        rowCount={arr.length}
        threshold={15}
      >
        {({ onRowsRendered, registerChild }) => (
          <WindowScroller onScroll={clearScrollToIndex}>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <div>
                <AutoSizer>
                  {({ width }) => {
                    console.log("scroll to index", scrollToIndex);
                    return (
                      <List
                        width={width}
                        autoHeight
                        rowCount={arr.length}
                        rowHeight={680}
                        height={height}
                        onRowsRendered={onRowsRendered}
                        // @ts-ignore
                        rowRenderer={e => {
                          return rowRenderer({ ...e, isScrolling });
                        }}
                        scrollTop={scrollTop}
                        style={{ paddingLeft: "0", paddingRight: "0" }}
                        // scrollToAlignment="start"
                        scrollToIndex={scrollToIndex}
                        onScroll={onChildScroll}
                      ></List>
                    );
                  }}
                </AutoSizer>
              </div>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
      <button
        style={{
          position: "relative",
          zIndex: 20
        }}
        onClick={() => {
          //@ts-ignore
          handleClick()
        }}
      >
        click
      </button>
    </ul>
  );
};

interface CalendarProps {
  days?: Array<number>;
}

const Calendar = () => {
  // const arr: Array<CalendarProps> = data;
  const [calendar, setCalendar] = React.useState(getCalendar(null));
  const [arr, setArr] = React.useState([]);

  React.useEffect(() => {}, [calendar]);

  return (
    <div>
      <MonthsList months={calendar} />
    </div>
  );
};

Calendar.propTypes = {};

export default Calendar;
