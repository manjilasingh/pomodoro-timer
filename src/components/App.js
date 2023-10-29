import "./App.css";
import Timer from "./Timer";
import { useState } from "react";
import { Component } from "react";

class App extends Component {
  render() {
    return (
      <div>
        <Timer />
      </div>
    );
  }
}

export default App;
