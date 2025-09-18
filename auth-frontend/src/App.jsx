import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./utils/firebase.js";
import { useState } from "react";
import './app.css'

const App = () => {
  const [isSignup, setIsSignup] = useState(false);
  const googlelogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const userdata = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL, 
        phoneNumber: user.phoneNumber,
      };

    const apiResponse=await fetch("http://localhost:8080/api/auth/google-login", {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(userdata),
});


      if (!apiResponse.ok) {
        throw new Error("Failed to login");
      }

      const responsedata = await apiResponse.json();
      console.log(responsedata);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <>
      <div className="container">
      <div className="auth-card">
        <h2>{isSignup ? "Create an Account" : "Welcome Back"}</h2>
        <form>
          {isSignup && (
            <div className="input-group">
              <label>Name</label>
              <input type="text" placeholder="Your Name" />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button onClick={googlelogin} className="btn-google">
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
    </>
  );
};

export default App;
