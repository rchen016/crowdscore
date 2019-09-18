// server.js
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const port = process.env.PORT || 5000;
const passport = require("passport");
const users = require("./src/routes/api/users");
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

var url = process.env.DATABASEURL || "mongodb://localhost/movie_app";
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use(users);

app.post("./register", function(res,req){
	console.log("test");
});
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
