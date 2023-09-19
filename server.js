// DEPENDENCIES //
//////////////////
// ENV package
require("dotenv").config();
// LOAD Express
const express = require("express");
// LOAD Mongoose
const mongoose = require("mongoose");
// LOAD methodOverrride
const methodOverride = require("method-override");
// CREATE Express
const app = express();

// PORT
// Define server port
const PORT = process.env.PORT || 3000;

// MODELS //
//////////////////
// LOGS Model
// const Logs = require("./models/Logs");

// MONGODB //
/////////////
// GLOBAL CONFIG MongoDB
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;
// CONNECT MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// LOGGER for MongoDB
db.on("error", (err) =>
  console.log(`Yo, MongoDB buggin' out...`, +err.message)
);
db.on("open", () => console.log(`MongoDB's on lock.`));
// VIEW .env URI
// db.on("open", () => console.log(`MongoDB on lock.`, `URI:`, mongoURI));
db.on("close", () => console.log("Bye, bye, MongoDB!"));

// MongoDB CONNECTION TIMEOUT (5 SEC)
// setTimeout(() => {
//   db.close();
// }, 5000);

// JSX VIEW ENGINE //
/////////////////////
// Built-in method
const jsxViewEngine = require("jsx-view-engine");
// DEFAULT, look for jsx
app.set("view engine", "jsx");
// CALL app engine
app.engine("jsx", jsxViewEngine());

// MIDDLEWARE //
////////////////
// LOG MIDDLEWARE
// app.use((req, res, next) => {
//   console.log(`Middleware. Runnin' hard on ALL routes!`);
//   next();
// });
// VIEW BODY OF A POST REQUEST
app.use(express.urlencoded({ extended: false }));
// OVERRIDES POST METHOD
app.use(methodOverride("_method"));

// ROUTES //
///////////?
app.get("/logs", async (req, res) => {
  try {
    const foundLogs = await Log.find({});
    console.log(foundLogs);
    res.status(200).render("Index", {
      logs: foundLogs,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// A(*). CatchAll
// TODO: Change after creating /logs Index route
// /logs
app.get("*", (req, res) => {
  res.redirect("/");
});

// SERVER: -P 3000
app.listen(PORT, function () {
  console.log(`Server's up at -P: ${PORT}`);
});

/* 
GITHUB REPO
https://github.com/andrewdoak/captains-log

ASSIGNMENT PAGE
https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-13/day-2/hw/

RESTFUL ROUTES
INDUCES for the order in your app
ACTION              URL                 HTTP VERB	    JSX VIEW	        MONGOOSE METHOD
I(1). Index	        /logs               GET	            Index.jsx	        Log.find()
N(2). New	          /logs/new           GET	            New.jsx	          NONE
D(3). Delete	  	  /logs/:id           DELETE                            findByIdAndDelete()                        
U(4). Update	      /logs/:id           PUT                 	     	      findByIdAndUpdate()
C(5). Create (?)	  /logs               POST                        	    create()
E(6). Edit	        /logs/:id/edit      GET             Edit.jsx          findById() 	                    
S(7). Show	        /logs/:id           GET             Show.jsx        	findById()                    

A(*). CatchAll      /logs               GET             Index.jsx
*/
