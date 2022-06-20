var express = require("express");
const Client = require("../models/clientModel");

var router = express.Router();

//Get All client
router.get("/all-client", (req, res) => {
  Client.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`${err} : GetAllClient`);
    });
});

//Get One Of client
router.get("/single-client/:id", (req, res) => {
  Client.findById(req.params.id)
    .then((result) => {
      res.send(result[0]);
    })
    .catch((err) => {
      console.log(`${err} : GetOneClient`);
    });
});

//Get one of clients based on username
router.get("/one-client/:username/:password", (req, res) => {
  Client.find({ username: req.params.username, password: req.params.password })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(`${err}: FindOneClient`);
    });
});

/* 
********************************************
* Express post() funkcija koja kreira i smesta kreiranu korisnika u bazu podataka 
* HTTP request: 'http://localhost:3000/api/client/post-client'
* Programer: Lazar Janicijevic && Dusan Ilic
<--- Verzija 1 --->
* Problem: Zahtev vraca objekat, potreban je niz zbog front end funkcionalnosti
* Testiranje obavljeno Postmanom, ne menjajuci bazu podataka
<--- Verzija 2 --->
* Resenje: Nakon cuvanja novokreiranog korisnika koristiti funkciju .find() koja vraca niz
********************************************
*/
router.post("/post-client", async (req, res) => {
  const client = new Client({
    username: req.body.username,
    password: req.body.password,
    staff: req.body.staff,
    forename: req.body.forename,
    surname: req.body.surname,
  });
  await client.save();
  Client.find({ username: req.body.username, password: req.body.password })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(`${err}: PostOneClient`);
    });
});

//EDIT USER
router.put("/put-client/:id", async (req, res) => {
  let doc = await Client.findById(req.params.id);
  if (doc) {
    if (req.body.username) {
      doc.username = req.body.username;
    }
    if (req.body.password) {
      doc.password = req.body.password;
    }
    if (req.body.forename) {
      doc.forename = req.body.forename;
    }
    if (req.body.surname) {
      doc.surname = req.body.surname;
    }
    await doc.save();
  } else {
    res.send("didn't fine that one");
    console.log("didn't fine that one");
  }
  Client.find({
    username: req.body.username,
    password: req.body.password,
  }).then((result) => {
    console.log(result);
    res.send(result);
  }).catch(err=>{
    console.log(`${err}: PutOneClient`);
  });
});
//Delete One client
router.delete("/delete-client/:id", (req, res) => {
  Client.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/client" }); // redirect to an url
    })
    .catch((err) => {
      console.log(`${err} : DeleteOneClient`);
    });
});

module.exports = router;
