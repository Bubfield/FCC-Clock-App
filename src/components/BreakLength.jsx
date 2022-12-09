import React from "react";

const BreakLength = ({ props }) => {
  const {
    breakLength,
    setBreakLength,
    setTimeLeft,
    timeLeft,
    displayBreak,
    timerRunning,
  } = props;

  const handleDecrement = () => {
    let newVar = breakLength - 1;

    if (timerRunning) {
      return;
    } else if (breakLength > 1) setBreakLength((prevLength) => prevLength - 1);

    if (displayBreak) {
      if (timeLeft.slice(1, 2) <= 1 && timeLeft.slice(0, 1) === "0") {
        return;
      } else if (timeLeft.slice(1, 2) > 0 && timeLeft.slice(3) === "00") {
        setTimeLeft(newVar >= 10 ? newVar + ":00" : "0" + newVar + ":00");
      } else if (timeLeft.slice(1, 2) === "0" && timeLeft.slice(3) === "00") {
        setTimeLeft(newVar < 10 ? "0" + newVar + ":00" : newVar + ":00");
      }
      if (timeLeft.slice(3) !== "00") {
        setTimeLeft(newVar >= 10 ? newVar + ":00" : "0" + newVar + ":00");
      }
    }
  };

  const handleIncrement = () => {
    if (timerRunning) {
      return;
    } else if (breakLength < 60) setBreakLength((prevLength) => prevLength + 1);

    if (displayBreak) {
      if (timeLeft.slice(0, 3) === "60:") {
        return;
      } else if (timeLeft.slice(0, 2) < 60 && timeLeft.slice(3) === "00") {
        setTimeLeft(
          (prevTime) =>
            prevTime.slice(0, 1) +
            (Number(prevTime.slice(1, 2)) + 1) +
            prevTime.slice(2)
        );
        if (timeLeft.slice(1, 2) === "9") {
          setTimeLeft(
            (prevTime) => Number(prevTime.slice(0, 1)) + 1 + prevTime.slice(2)
          );
        }
      } else if (
        timeLeft.slice(3) !== "00" &&
        timeLeft.slice(1, 2) !== "8" &&
        timeLeft.slice(1, 2) !== "9" &&
        timeLeft.slice(0, 2) !== "59"
      ) {
        setTimeLeft(
          (prevTime) =>
            prevTime.slice(0, 1) +
            (Number(prevTime.slice(1, 2)) + 2) +
            prevTime.slice(2, 3) +
            "00"
        );
      } else if (timeLeft.slice(3) !== "00" && timeLeft.slice(1, 2) === "8") {
        setTimeLeft(
          (prevTime) =>
            Number(prevTime.slice(0, 1)) +
            1 +
            ("0" + prevTime.slice(2, 3) + "00")
        );
      } else if (
        timeLeft.slice(3) !== "00" &&
        timeLeft.slice(1, 2) === "9" &&
        timeLeft.slice(0, 2) !== "59"
      ) {
        setTimeLeft(
          (prevTime) =>
            Number(prevTime.slice(0, 1)) +
            1 +
            ("1" + prevTime.slice(2, 3) + "00")
        );
      }
    }
  };

  return (
    <div id="break-label">
      <h1>Break Length</h1>
      <div className="break-buttons-div">
        <button type="button" id="break-decrement" onClick={handleDecrement}>
          -
        </button>
        <div id="break-length">{breakLength}</div>
        <button type="button" id="break-increment" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

export default BreakLength;
