import React, { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import Authenticate from "./components/Authenticate";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="app-container">
      <SignUpForm setToken={setToken} />
      <Authenticate token={token} />
    </div>
  );
}

export default App;
