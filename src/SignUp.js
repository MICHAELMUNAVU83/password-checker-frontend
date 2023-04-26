import { useState } from "react";
import { Link } from "react-router-dom";
function SignUp({ setStoredToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [strengthPercentage, setStrengthPercentage] = useState("0");

  var strengthScore = 0;
  function checkPasswordStrength(password) {
    var lowerCaseRegex = /[a-z]/g;
    var upperCaseRegex = /[A-Z]/g;
    var numberRegex = /[0-9]/g;
    var specialCharRegex = /[\W_]/g;

    var lowerCaseScore = 5;
    var upperCaseScore = 5;
    var numberScore = 5;
    var specialCharScore = 5;

    // Calculate the password strength score
    if (password.match(lowerCaseRegex)) {
      strengthScore += lowerCaseScore;
    }
    if (password.match(upperCaseRegex)) {
      strengthScore += upperCaseScore;
    }
    if (password.match(numberRegex)) {
      strengthScore += numberScore;
    }
    if (password.match(specialCharRegex)) {
      strengthScore += specialCharScore;
    }

    if (strengthScore === 0) {
      return 0;
    } else if (strengthScore < 8) {
      return 50;
    } else if (strengthScore < 16) {
      return 75;
    } else {
      return 100;
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/v1/users", {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        console.log(data);
        setStoredToken(data.jwt);
      });

    setUsername("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="App">
      <h1>Create new user</h1>
      <form classname="flex flex-col justify-center">
        <label>
          Username:
          <input
            type="text"
            name="name"
            className="border-2 border-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            className="border-2 border-gray-500"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            name="password"
            className="border-2 border-gray-500"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
          />
          <div className="w-[200px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${checkPasswordStrength(password)}%` }}
            ></div>
          </div>
        </label>
        <button onClick={handleSubmit} className="bg-red-500">
          Submit
        </button>
      </form>
      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default SignUp;
