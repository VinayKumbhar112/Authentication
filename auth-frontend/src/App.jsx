import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./utils/firebase.js";
import "./app.css";

const App = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Google login
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const userdata = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        phoneNumber: user.phoneNumber,
      };

      const apiResponse = await fetch("https://authentication-1-9vju.onrender.com//api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userdata),
      });

      const data = await apiResponse.json();
      if (!apiResponse.ok) {
        setErrorMessage(data.message || "Failed to login with Google");
        return;
      }

      console.log("Google Auth Response:", data);
      // ✅ External redirect
      window.location.href = "https://crautomate.vercel.app";
    } catch (error) {
      console.error("Google login failed:", error);
      setErrorMessage("Google authentication failed.");
    }
  };

  // Normal form login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // reset error

    try {
      const endpoint = isSignup
        ? "https://authentication-1-9vju.onrender.com//api/auth/signup"
        : "https://authentication-1-9vju.onrender.com//api/auth/login";

      const payload = isSignup
        ? {
            name: e.target.name?.value,
            email: e.target.email.value,
            password: e.target.password.value,
          }
        : {
            email: e.target.email.value,
            password: e.target.password.value,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message || "Failed to authenticate");
        return;
      }

      console.log("Auth success:", data);
      // ✅ External redirect
      window.location.href = "https://crautomate.vercel.app";
    } catch (err) {
      console.error("Form login/signup failed:", err);
      setErrorMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2>{isSignup ? "Create an Account" : "Welcome To Automatter"}</h2>

        {/* Error Popup */}
        {errorMessage && <div className="error-popup">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="input-group">
              <label>Name</label>
              <input type="text" name="name" placeholder="Your Name" required />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button onClick={googleLogin} className="btn-google">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
          />
          Sign in with Google
        </button>

        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default App;
