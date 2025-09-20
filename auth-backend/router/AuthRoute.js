import express from "express";
import { signup, login, googleLogin } from "../controller/Authentication.js";

const AuthRoute = express.Router();

// Signup
AuthRoute.post("/signup", signup);

// Login
AuthRoute.post("/login", login);

// Google Login
AuthRoute.post("/googleLogin", googleLogin);

export default AuthRoute;
