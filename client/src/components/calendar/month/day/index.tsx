import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

const Day = ({ isToday, children }: any) => {
  return (
    <div
      className={cn(styles.day, {
        [styles.isEmpty]: !children,
        [styles.isToday]: isToday
      })}
    >
      {children}
    </div>
  );
};

export default Day;
