// server.js

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const db = require("./config/keys").process.env.DATABASEURL;

const passport = require("passport");
const users = require("./routes/api/users");
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

var url = process.env.DATABASEURL || "mongodb://localhost/movie_app";
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
				.then(()=> console.log("MongoDB Connected!"))
				.catch(err=>console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use(users);

if(process.env.NODE_ENV === "production"){
	app.use(express.static("client/build"));
}

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
// mongoose
//   .connect(
//     db,
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
