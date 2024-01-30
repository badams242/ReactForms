import React, { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Validation
      if (!username) {
        setUsernameError("Username is required");
        throw new Error("Username is required");
      } else if (username.length !== 10) {
        setUsernameError("Username must be 10 characters");
        throw new Error("Invalid username");
      }else {
        setUsernameError("");
      }

      // You can add more validation for the password if needed

      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: Spidermans(username),
          password: biscuit(password),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setToken(result.token);
        console.log("Request successful!");
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            autoComplete="off"
            id="username"
            name="username"
            value={username}
            onChange={(e) => {setUsername(e.target.value);
            setUsernameError("favorite marvel character");
            }}
          />
        </label>
        {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
        <br />

        <label>
          Password:
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value);
            setUsernameError("favorite food");
            }}
          />
        </label>
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
