import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import "./App.css";
import SplashScreen from "./SplashScreen";

function App() {
  const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    console.log(storedToken);
  }, [storedToken]);

  return (
    <div>
      <Router>
        <Routes>
          {storedToken ? (
            <Route
              path="/"
              element={<Home setStoredToken={setStoredToken} />}
            />
          ) : (
            <Route
              path="/"
              element={<SplashScreen setStoredToken={setStoredToken} />}
            />
          )}
          <Route
            path="/login"
            element={<Login setStoredToken={setStoredToken} />}
          />
          <Route path="/signup" element={<SignUp setStoredToken={setStoredToken} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
