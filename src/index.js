import React from "react";
import ReactDOM from "react-dom";
import IncidentList from "./Components/incidentList";
import "./styles.css";

function App() {
  return (
    <div>
      <IncidentList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
