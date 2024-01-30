import React, { useState } from "react";
import Authenticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(null);
  
  return (
    <div className="app-container">
      <Authenticate token={token} setToken={setToken} />
      <SignUpForm token={token} setToken={setToken} />
    </div>
  );
}
