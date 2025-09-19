import express from "express";
import { signup, login } from "../controller/Authentication.js";

const AuthRoute = express.Router();

AuthRoute.post("/signup", signup);
AuthRoute.post("/signup", async (req, res) => {
  console.log("Signup request body:", req.body); // 👈 check this
  
});

AuthRoute.post("/login", login);


export default AuthRoute;
