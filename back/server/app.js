//init da napravis json fajl za depedencije
//npm install cors body-parser express nodemon
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

var port = process.env.PORT || 3000;

//connect to mongodb
const db =
  "mongodb+srv://zvoosh:jebemvukumater99@nodeside.qmrbtlv.mongodb.net/node-side?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
    console.log('Running')
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json());
//Cross-origin resource sharing, enables to be requested from another domain outside the domain from which the first resource was served.
app.use(cors());

var auditorium = require("./API/auditorium");
app.use("/api/auditorium", auditorium);
var room = require("./API/room");
app.use("/api/room", room);
var client = require("./API/client");
app.use("/api/client", client);
var reservation = require("./API/reservation");
app.use("/api/reservation", reservation);

app.use(bodyParser.json());
app.use(cors());
