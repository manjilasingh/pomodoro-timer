import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsPlayCircleFill } from "react-icons/bs";
import Navbar from "./Navbar";
import { BsPauseCircleFill } from "react-icons/bs";
import { IoCaretBackOutline } from "react-icons/io5";
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
        //in focus mode
        setRemainingFocusTime((prevTime) => {
          return prevTime - 1;
        });
      } else {
        setRemainingBreakTime((prevTime) => {
          return prevTime - 1;
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
  let minutes = 0,
    seconds = 0;
  if (focusMode) {
    minutes = Math.floor(remainingFocusTime / 60);
    seconds = remainingFocusTime % 60;
  } else {
    minutes = Math.floor(remainingBreakTime / 60);
    seconds = remainingBreakTime % 60;
  }
  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedSeconds = String(seconds).padStart(2, "0");
  let timeValue = `${formattedMinutes}:${formattedSeconds}`;
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
              text={timeValue}
              background
              styles={buildStyles({
                textColor: "#DAE8E9 ",
                backgroundColor: "#2b3137",
                pathColor: focusMode ? "#50C878" : "#c85a50",
                trailColor: "transparent",
              })}
            ></CircularProgressbarWithChildren>
            ;
          </div>
          <div class="btn-container">
            <IoCaretBackOutline
              className="restart-btn"
              onClick={() => {
                setPaused(true);
                setFocusMode(true);
                setRemainingFocusTime(focusTime * 60);
                setRemainingBreakTime(breakTime * 60);
              }}
            />
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
            <IoCaretBackOutline
              className="skip-btn"
              onClick={() => {
                setPaused(false);
                setFocusMode(false);
                setRemainingFocusTime(focusTime * 60);
                setRemainingBreakTime(breakTime * 60);
              }}
            />
          </div>
          <Display />
        </div>
      </div>
    </SettingContext.Provider>
  );
}

export default Timer;
