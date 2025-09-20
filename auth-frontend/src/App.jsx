import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./utils/firebase.js";
import "./App.css";

const BACKEND_URL = "https://authentication-1-9vju.onrender.com/api/auth"; // ✅ Correct backend URL

const App = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
const [loading, setLoading] = useState(false);

  // Google login
  const googleLogin = async () => {
  try {
    setLoading(true); // show loader
    const response = await signInWithPopup(auth, provider);
    const user = response.user;

    const userdata = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      phoneNumber: user.phoneNumber,
    };

    const apiResponse = await fetch(`${BACKEND_URL}/googleLogin`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userdata),
    });

    if (!apiResponse.ok) {
      const text = await apiResponse.text();
      throw new Error(text || "Failed to login with Google");
    }

    const data = await apiResponse.json();
    console.log("Google Auth Response:", data);

    window.location.href = "https://crautomate.vercel.app";
  } catch (error) {
    console.error("Google login failed:", error);
    setErrorMessage(error.message || "Google authentication failed.");
    setLoading(false);
  }
};


  // Normal form login/signup
 const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");
  setLoading(true);

  try {
    const endpoint = isSignup ? `${BACKEND_URL}/signup` : `${BACKEND_URL}/login`;

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

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Failed to authenticate");
    }

    const data = await response.json();
    console.log("Auth success:", data);

    window.location.href = "https://crautomate.vercel.app";
  } catch (err) {
    console.error("Form login/signup failed:", err);
    setErrorMessage(err.message || "Something went wrong. Try again.");
    setLoading(false);
  }
};


  return (
    <div className="container">
      <div className="auth-card">
        <h2>{isSignup ? "Create an Account" : "Welcome To Automatter"}</h2>

        {/* Error Popup */}
        {errorMessage && <div className="error-popup">{errorMessage}</div>}
        {loading && (
  <div className="loader-overlay">
    <div className="spinner"></div>
    <p>Redirecting...</p>
  </div>
)}


        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="input-group">
              <label>Name</label>
              <input type="text" name="name" placeholder="Your Name" required />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="you@example.com" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-primary">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button onClick={googleLogin} className="btn-google">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
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
