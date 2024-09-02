require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require('morgan');
const port = process.env.PORT;
const cookie = require('cookie-parser');


// view engine setup
app.set("view engine", 'ejs');

// in-built middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookie());

app.get("/", (req, res)=>{
    res.render("register.ejs");
});

const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes');

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);


app.listen(port, () => {
  // Database connection -> mongoose function
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database connection established sucess...")
    })
    .catch((err) => console.log(err));
console.log(`Server start at http://localhost:${port}`);
})
