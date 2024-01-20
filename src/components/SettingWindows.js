import { AiFillCloseCircle } from "react-icons/ai";
import NumericInput from "react-numeric-input";
import React, { Component, useContext, useState } from "react";
import { SettingWindowContext } from "./Navbar";
import { SettingContext } from "./Timer";

function SettingWindow() {
  const {
    focusTime,
    setFocusTime,
    breakTime,
    setBreakTime,
    setRemainingFocusTime,
    setRemainingBreakTime,
    focusMode,
  } = useContext(SettingContext);
  const [showSetting, setSetting] = useContext(SettingWindowContext);

  function closeFunction() {
    setRemainingFocusTime(5 * 60);
    setRemainingBreakTime(1 * 60);
    setFocusTime(5);
    setSetting(false);
    setBreakTime(1);
  }
  function saveChanges() {
    setSetting(false);
  }

  return (
    <div>
      <div className="setting-container">
        <div className="setting-nav">
          <div className="setting-title">CUSTOM TIMER</div>
          <AiFillCloseCircle className="setting-btn" onClick={closeFunction} />
        </div>
        <div className="setting-timer">
          <div className="setting-timer-container">
            <div className="setting-block">
              <div className="setting-t1">Focus</div>
              <NumericInput
                className="box"
                min={1}
                max={12272002}
                value={focusTime}
                onChange={(value) => {
                  setFocusTime(value);
                  setRemainingFocusTime(value * 60);
                }}
              />
            </div>
            <div className="setting-block">
              <div className="setting-t1">Break</div>
              <NumericInput
                className="box"
                min={0}
                max={12272002}
                value={breakTime}
                onChange={(value) => {
                  setBreakTime(value);
                  setRemainingBreakTime(value * 60);
                }}
              />
            </div>
          </div>
        </div>
        <div className="setting-timer-footer" onClick={saveChanges}>
          Save Changes
        </div>
      </div>
    </div>
  );
}

export default SettingWindow;
