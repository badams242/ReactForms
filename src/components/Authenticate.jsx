import React, { useState, useEffect } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccessMessage(null);
      setError(null);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [successMessage, error]);

  async function handleAuthenticate() {
    try {
      setIsLoading(true);

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

      if (response.ok) {
        setSuccessMessage(result.message);
        setAuthenticated(true);
      } else {
        throw new Error(result.error || "Authentication failed");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="authenticate-container">
      <h2>Authenticate</h2>
      {isLoading && <p>Loading...</p>}
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      {authenticated && <p>Token authenticated successfully!</p>}
      <button onClick={handleAuthenticate} disabled={isLoading}>
        Authenticate Token
      </button>
    </div>
  );
}