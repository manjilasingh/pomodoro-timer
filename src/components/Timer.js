import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsPlayCircleFill } from "react-icons/bs";
import Navbar from "./Navbar";
import { BsPauseCircleFill } from "react-icons/bs";
import React, { useState, createContext, useEffect } from "react";
import Display from "./Display";
// eslint-disable-next-line
export const SettingContext = React.createContext();

function Timer() {
  const [focusTime, setFocusTime] = useState(5);
  const [breakTime, setBreakTime] = useState(1);
  const [isPaused, setPaused] = useState(true);

  const [remainingFocusTime, setRemainingFocusTime] = useState(5 * 60);
  const [remainingBreakTime, setRemainingBreakTime] = useState(1 * 60);

  const [focusMode, setFocusMode] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPaused === true) {
        return () => clearInterval(timer);
      }
      if (remainingFocusTime <= 0) {
        setFocusMode(false);
      }
      if (focusMode === false && remainingBreakTime <= 0) {
        setPaused(true);
        setFocusMode(true);
        setRemainingFocusTime(focusTime * 60);
        setRemainingBreakTime(breakTime * 60);
        return () => clearInterval(timer);
      }

      if (focusMode) {
        setRemainingFocusTime((prevTime) => {
          console.log(remainingFocusTime);
          return prevTime - 1;
        });
      } else {
        setRemainingBreakTime((prevTime) => {
          prevTime = prevTime - 1;
          console.log(prevTime);
          return prevTime;
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [
    isPaused,
    focusMode,
    remainingFocusTime,
    remainingBreakTime,
    focusTime,
    breakTime,
  ]);
  let t = focusMode ? remainingFocusTime : remainingBreakTime;
  let r = focusMode ? focusTime : breakTime;
  const percent = Math.round((t / (r * 60)) * 100);

  return (
    // eslint-disable-next-line
    <SettingContext.Provider
      value={{
        focusTime,
        setFocusTime,
        breakTime,
        setBreakTime,
        setRemainingFocusTime,
        setRemainingBreakTime,
        focusMode,
      }}
    >
      <div>
        <div className="main-container">
          <Navbar />
          <div className="timer-container">
            <CircularProgressbarWithChildren
              value={percent}
              background
              styles={buildStyles({
                backgroundColor: "#486882",
                pathColor: focusMode ? "#50C878" : "#c85a50",
                trailColor: "transparent",
              })}
            >
              {isPaused ? (
                <BsPlayCircleFill
                  className="play-pause-btn"
                  onClick={() => setPaused(false)}
                />
              ) : (
                <BsPauseCircleFill
                  className="play-pause-btn"
                  onClick={() => setPaused(true)}
                />
              )}
            </CircularProgressbarWithChildren>
            ;
          </div>
          <Display />
        </div>
      </div>
    </SettingContext.Provider>
  );
}

export default Timer;
