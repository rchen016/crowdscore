// server.js

var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
	mongoose         = require("mongoose"),
	passport         = require("passport"),
	LocalStrategy    = require("passport-local"),
	User             = require("./models/user"),
	path             = require("path"),
	methodOverride   = require("method-override"),
	flash            = require("connect-flash"),
	cors             = require("cors"),
	PORT             = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
	secret: "testtesttest",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/signup", function(req,res){
	console.log("ROUTE");
	res.redirect("/");
});

app.listen(process.env.PORT || PORT, function(){
    console.log('Your node js server is running');
});
