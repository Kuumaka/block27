import React, { useState } from "react";

function Authenticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (result.message) {
        if (result.message === "jwt malformed") {
          setSuccessMessage("");
          setError("jwt malformed");
        } else {
          setError("");
          setSuccessMessage(result.message);
          setUserData(result.data);
        }
      }
    } catch (err) {
      setError("Please create an account first");
    }
  };

  return (
    <div className="authenticate">
      <h2>Authenticate</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {userData && <p>Welcome, {userData.username}!</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
}

export default Authenticate;
