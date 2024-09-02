const express = require('express');
const { showRegister, registerUser, showLogin, loginUser } = require('../controller/user.controller');
const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.get("/register", showRegister);

userRoutes.post('/login', loginUser)
userRoutes.get("/login", showLogin);

module.exports = userRoutes;