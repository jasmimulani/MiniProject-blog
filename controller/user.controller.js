const User = require('../model/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.showRegister = async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error" });
    }
}

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({email:req.body.email, isDelete: false });
        if (user) {
            return res.json({ message: 'User already exist...' })
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10)

        user = await User.create({ ...req.body, password: hashPassword })
        await user.save()

        // res.status(201).json({ user, message: 'Register success...' })
        res.redirect("/user/login");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.showLogin = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
        res.json({ messag: "Server error" });
    }
};


exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({email:req.body.email, isDelete:false });
        if (!user) {
            return res.redirect("/user/login");
            // console.log("user not found");
        }
        let comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.redirect("/user/login"); 
            // console.log("passsowrd not match");
        }
        let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log(token);
        res.cookie("auth_token", `Bearer ${token}`);
        res.redirect('/blog');
        // console.log('login successfully');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}
