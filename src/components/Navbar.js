import { IoStatsChart } from "react-icons/io5";
import { BsGearFill } from "react-icons/bs";
import SettingWindows from "./SettingWindows";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import React, { useState, useContext } from "react";

export const SettingWindowContext = React.createContext();
function Navbar() {
  const [showSetting, setSetting] = useState(false);
  return (
    // eslint-disable-next-line
    <SettingWindowContext.Provider value={[showSetting, setSetting]}>
      <div className="navbar-container">
        <h1 className="heading">POMODORO TIMER</h1>
        <div className="icons-container">
          <IoStatsChart className="btn stat-btn" />;
          <BsGearFill
            className="btn gear-btn"
            onClick={() => setSetting(true)}
          />
          ;
        </div>
      </div>
      {showSetting && <SettingWindows />}
    </SettingWindowContext.Provider>
  );
}

export default Navbar;
