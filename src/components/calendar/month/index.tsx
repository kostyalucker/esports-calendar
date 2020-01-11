import React from "react";
import VirtualList from "react-tiny-virtual-list";
import Day from "./day";
import "./styles.scss";

// let DateRange = new FormatDate();
// const days = Array.from(Array(31).keys());

interface MonthProps {
  month?: any;
}

const Month = (props: MonthProps) => {
  const { month } = props;

  return (
    <div className="month">
      {month.map((el: any, index: number) => {
        return <Day key={`${el}_${index}`}>{el ? el.date() : ""}</Day>;
      })}
    </div>
  );
};

export default Month;
