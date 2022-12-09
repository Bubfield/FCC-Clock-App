import React from "react";
import BreakLength from "./BreakLength";
import SessionLength from "./SessionLength";

const Label = ({ props }) => {
  const {
    breakLength,
    sessionLength,
    setBreakLength,
    setSessionLength,
    timeLeft,
    setTimeLeft,
    displayBreak,
    timerRunning,
  } = props;

  const propsObject = {
    breakLength,
    sessionLength,
    setBreakLength,
    setSessionLength,
    timeLeft,
    setTimeLeft,
    displayBreak,
    timerRunning,
  };

  return (
    <div className="label-div">
      <BreakLength props={propsObject} />
      <SessionLength props={propsObject} />
    </div>
  );
};

export default Label;
