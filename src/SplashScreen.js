import React from "react";
import { Link } from "react-router-dom";
const SplashScreen = () => {
  return (
    <div>
      <h1>Welcome to my app!</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default SplashScreen;
