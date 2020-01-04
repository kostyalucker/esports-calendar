import React from "react";
import Day from "./day";

import "./styles.scss";

const days = Array.from(Array(31).keys());

const Month = () => {
  return (
    <div className="month">
      {days.map(day => {
        return <Day>{day}</Day>
      })}
    </div>
  );
};

export default Month;
