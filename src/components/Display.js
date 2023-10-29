import { SettingContext } from "./Timer";
import { useContext } from "react";

function Display() {
  const {
    focusTime,
    setFocusTime,
    breakTime,
    setBreakTime,
    setRemainingFocusTime,
    setRemainingBreakTime,
    focusMode,
  } = useContext(SettingContext);
  return <div className="display-container"></div>;
}
export default Display;
