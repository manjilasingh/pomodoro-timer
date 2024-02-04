import { MdLibraryMusic } from "react-icons/md";
import { BsGearFill } from "react-icons/bs";
import SettingWindows from "./SettingWindows";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import React, { useState, useContext, useRef } from "react";
import sound from "../files/piano_audio.mp3";
export const SettingWindowContext = React.createContext();
function Navbar() {
  const [showSetting, setSetting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // const audio = new Audio("..../public/piano_audio.mp3");

  const audioRef = useRef(new Audio(sound));
  function playMusic() {
    const audio = audioRef.current;
    if (!isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio", error);
        //looping
      audio.loop=true;
      });
    } else {
      audio.pause();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    // eslint-disable-next-line
    <SettingWindowContext.Provider value={[showSetting, setSetting]}>
      <div className="navbar-container">
        <h1 className="heading">POMODORO TIMER</h1>
        <div className="icons-container">
          <MdLibraryMusic className="btn sound-btn" onClick={playMusic} />
          ;
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
