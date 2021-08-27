const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require('cookie-parser');


const app = express();

require("dotenv").config();

// ! connect to the mongodb database...
mongoose.connect(
  process.env.URL,
  {
    useNewUrlParser: true,  
   useUnifiedTopology: true,  
   useFindAndModify: false
  },
  () => {
  console.log("Connection to mongodb database was successful!");
  }
);


// middlewares
app.use (express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use( express.static( "public" ) );
app.set("view engine", "ejs");

// routes

app.use(require("./routes/compose"));
app.use(require("./routes/blog"));
app.use(require("./routes/user"));




// server configurations are here....
const port= process.env.PORT ||   '3000';
app.listen(port, () => console.log("Server started listening on port: 3000"));
