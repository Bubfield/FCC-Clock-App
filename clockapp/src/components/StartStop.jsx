import React from "react";

const StartStop = ({ props }) => {
  const {
    setTimeLeft,
    setBreakLength,
    setSessionLength,
    startTimer,
    intervalId,
    setIntervalId,
    setDisplayBreak,
    setTimerLabel,
    setTimerRunning,
  } = props;

  const handleReset = () => {
    setTimeLeft("25:00");
    setBreakLength(5);
    setSessionLength(25);
    clearInterval(intervalId);
    setIntervalId(0);
    setDisplayBreak(false);
    setTimerLabel("Session");
    setTimerRunning(false);
    return;
  };

  return (
    <div className="start-stop-div">
      <button type="button" id="start_stop" onClick={startTimer}>
        start or stop
      </button>
      <button type="button" id="reset" onClick={handleReset}>
        reset
      </button>
    </div>
  );
};

export default StartStop;
