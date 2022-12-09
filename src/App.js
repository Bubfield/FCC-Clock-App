import Header from "./components/Header";
import Label from "./components/Label";
import Timer from "./components/Timer";
import StartStop from "./components/StartStop";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";

const App = () => {
  const [timeLeft, setTimeLeft] = useState("25:00");
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [intervalId, setIntervalId] = useState(0);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [displayBreak, setDisplayBreak] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const url =
      "http://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3";
    const audio = new Audio(url);
    const onPlay = () => audio.play();

    let timerLabelElmnt = document.getElementById("timer-label");
    let timeLeftElmnt = document.getElementById("time-left");
    if (timeLeft.slice(0, 2) === "00") {
      timerLabelElmnt.style.color = "#7a0033";
      timeLeftElmnt.style.color = "#7a0033";
    } else {
      timerLabelElmnt.style.color = "white";
      timeLeftElmnt.style.color = "white";
    }

    if (timeLeft === "00:00") {
      audio.addEventListener("canplaythrough", onPlay);
      clearInterval(intervalId);
      setIntervalId(0);
      const timer = setTimeout(() => {
        if (timerLabel === "Session") {
          setTimerLabel("Break");
          setDisplayBreak(true);
          if (breakLength < 10) {
            setTimeLeft("0" + breakLength + ":00");
          } else {
            setTimeLeft(breakLength + ":00");
          }
        } else {
          setTimerLabel("Session");
          setDisplayBreak(false);
          if (sessionLength < 10) {
            setTimeLeft("0" + sessionLength + ":00");
          } else {
            setTimeLeft(sessionLength + ":00");
          }
        }
        const newIntervalId = setInterval(() => {
          setTimeLeft((prevTimeLeft) => handleTime(prevTimeLeft));
        }, 1000);
        setIntervalId(newIntervalId);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
    return () => {
      if (audio) {
        //audio.pause(); // to enable garbage collection
        audio.removeEventListener("canplaythrough", onPlay);
      }
    };
  }, [timeLeft, intervalId, breakLength, sessionLength, timerLabel]);

  const handleTime = (timer) => {
    let regex = /[1-9]/g;
    let a = timer.slice(0, 1);
    let b = timer.slice(1, 2) - 1;
    let c = timer.slice(3, 4);
    let d = timer.slice(4, 5);
    let e = timer.slice(0, 3);
    let f = a - 1;

    if (timer.slice(3) === "00" && timer.slice(1, 2) !== "0") {
      timer = a + b + ":59";
      return timer;
    } else if (timer.slice(3) === "00" && timer.slice(1, 2) === "0") {
      timer = f + "9:59";
      return timer;
    } else if (regex.test(d)) {
      return timer.slice(0, 4) + (d - 1);
    } else if (d === "0" && c !== "0") {
      d = "9";
      return e + (c - 1) + d;
    }
  };

  const startTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      setTimerRunning(false);
      return;
    }

    setTimerRunning(true);

    const newIntervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => handleTime(prevTimeLeft));
    }, 1000);
    setIntervalId(newIntervalId);
  };

  return (
    <div className="App">
      <Header text="25 + 5 Clock" />
      <Label
        props={{
          breakLength,
          sessionLength,
          setBreakLength,
          setSessionLength,
          timeLeft,
          setTimeLeft,
          displayBreak,
          timerRunning,
        }}
      />
      <Timer timerLabel={timerLabel} timeLeft={timeLeft} />
      <StartStop
        props={{
          setTimeLeft,
          setBreakLength,
          setSessionLength,
          startTimer,
          handleTime,
          intervalId,
          setIntervalId,
          setDisplayBreak,
          setTimerLabel,
          setTimerRunning,
        }}
      />
      <Footer />
    </div>
  );
};

export default App;
