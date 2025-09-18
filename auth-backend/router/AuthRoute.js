import login from "../controller/Authentication.js";
import express from "express";
const AuthRoute=express.Router();

AuthRoute.post("/google-login",login)

export default AuthRoute;