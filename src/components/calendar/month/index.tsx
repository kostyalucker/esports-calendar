import React from "react";
import moment from "moment";
import Day from "./day";
import styles from "./styles.module.scss";

interface MonthProps {
  month?: any;
}

const Month = (props: MonthProps) => {
  const { month } = props;

  return (
    <ul className={styles.month}>
      {month.map((el: any, index: number) => {
        return (
          <li className={styles.item} key={`${el}_${index}`}>
            <Day isToday={el && el.isSame(moment(), "day")}>
              {el ? el.date() : ""}
            </Day>
          </li>
        );
      })}
    </ul>
  );
};

export default Month;
