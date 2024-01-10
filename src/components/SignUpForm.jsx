import React, { useState } from "react";

function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");

  const validateForm = () => {
    if (username.length < 8) {
      setValidationMessage("Username must be at least 8 characters long");
      return false;
    }
    setValidationMessage("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        setSuccess("Sign up success");
      } else {
        setError("Signup failed");
      }
    } catch (err) {
      setError("Could not sign up");
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      {validationMessage && (
        <p className="validation-message">{validationMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;
