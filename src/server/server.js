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

var url = process.env.DATABASEURL || "mongodb://localhost/movie_app";
mongoose.connect(url,{useNewUrlParser: true});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(cors());
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
	console.log("Signing up now...");
	console.log(req.body.username);
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password ,function(err,user){
		if(err){
			console.log(err);
			res.redirect("/");
		}
		else{
			passport.authenticate("local")(req, res, function(){
				console.log("YEE");
				res.redirect("/");
			});
		}
	});
});

app.listen(process.env.PORT || PORT, function(){
    console.log('Your node js server is running');
});
