

var express = require("express");
const Room = require("../models/roomModel");
var fs = require("fs");
var multer = require("multer");

var router = express.Router();
var date_now = Date.now();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/app-hotel/src/assets/");
  },
  filename: function (req, file, cb) {
    cb(null, date_now + file.originalname);
  },
});

var fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload = multer({ storage: storage, fileFilter: fileFilter });


/* 
********************************************
* Express get() funkcija koja vraca sve sobe iz baze
* HTTP request: 'http://localhost:3000/api/room/all-room'
* Programer: Dusan Ilic
********************************************
*/
router.get("/all-room", (req, res) => {
  Room.find()                                           // Mongoose model funkcija .find() vraca u ovom slucaju sve sobe jer nema parametre za poredjenje
    .then((result) => { 
      res.send(result);                                 // slanje rezultata funkcije .find() kao odgovor na HTTP request
    })
    .catch((err) => {
      console.log(`${err} : GetAllRoom`);               // u slucaju greske vraca gresku i mesto greske
    });
});

/* 
********************************************
* Express get() funkcija koja vraca izricitu sobu za zadati ID
* HTTP request: 'http://localhost:3000/api/room/single-room/:id'
* Programer: Dusan Ilic
********************************************
*/
router.get("/single-room/:id", (req, res) => {
  Room.findById(req.params.id)                          // Mongoose model funkcija . findById() vraca prvi element sa zadatim ID-em koji pronadje
    .then((result) => {
      res.send(result);                                 // slanje rezultata funkcije .findById() kao odgovor na HTTP request
    })
    .catch((err) => {
      console.log(`${err} : GetOneRoom`);               // u slucaju greske vraca gresku i mesto greske
    });
});




/* 
********************************************
* Express post() funkcija koja kreira i smesta kreiranu sobu u bazu podataka 
* HTTP request: 'http://localhost:3000/api/room/post-room/:roomId/:price/:bedCount/:bedType/:terrace/:oriented/:floor/:internetConnection/:wardrobes/:stars'
* Programer: Dusan Ilic
********************************************
*/
router.post(
  "/post-room/:roomId/:price/:bedCount/:bedType/:terrace/:oriented/:floor/:internetConnection/:wardrobes/:stars",
  upload.single("productImage"),                        // dajemo do znanja funkciji da ce da se fajl koji posaljemo smestati u varijablu tela "productImage"
  (req, res) => {
    const room = new Room({                             // new Room() funkcija koja pravi novi Room objekat sa zadatim parametrima popunjuje atribute modela koji smesta u bazu podataka
      roomId: req.params.roomId,
      price: req.params.price,                          // req.params.* daje do znanja da se parametar prosledjuje putem HTTP parametara
      imgSrc: date_now + req.file.originalname,         // req.file.originalname daje do znanja da se pristupa fajlu koji prosledjujemo u varijabli "productImage"
      booked: false,
      bedCount: req.params.bedCount,
      bedType: req.params.bedType,
      terrace: req.params.terrace,
      oriented: req.params.oriented,
      floor: req.params.floor,
      internetConnection: req.params.internetConnection,
      wardrobes: req.params.wardrobes,
      stars: req.params.stars,
    });
    room
      .save()                                           // room.save() je funkcija koja sacuva sve promene koje smo vrsili na bazu podataka
      .then((result) => {
        res.send(result);                               // slanje rezultata funkcije .save() kao odgovor na HTTP request, u ovom slucaju bas taj objekat koji smo napravili
      })
      .catch((err) => {
        console.log(`${err} : PostOneRoom`);            // u slucaju greske vraca gresku i mesto greske
      });
  }
);

router.post("/add-dates-room", async (req, res) => {
  let doc = await Room.findOne({ _id: req.body.room });
  doc.bookedAt.push(req.body.bookedAtRoom);
  doc.bookedTill.push(req.body.bookedTillRoom);
  doc.booked = true;
  await doc.save();
  res.send("success")
});







/* 
********************************************
* Express patch() funkcija menja izricitu sobu za zadati id
* HTTP request: 'http://localhost:3000/api/room/post-room/patch-room/:id'
* Programer: Dusan Ilic
********************************************
*/
router.patch("/patch-room/:id", (req, res) => {
  Room.findById(req.params.id).then(async (result) => { // Mongoose model funkcija . findById() vraca prvi element sa zadatim ID-em koji pronadje
    result.booked = req.body.booked;                    // Za nadjenu sobu menja atribut booked u zavisnosti od parametra tela zahteva
    result.bookedAt = req.body.bookedAt;                // Za nadjenu sobu menja atribut bookedAt u zavisnosti od parametra tela zahteva
    result.bookedTill = req.body.bookedTill;            // Za nadjenu sobu menja atribut bookedTill u zavisnosti od parametra tela zahteva
    await result.save();                                // Cuva sve promene u bazi podataka
    res.send("success");                                // salje klijentu odgovor , "uspeh!"
  });
});

//PUT BASED ON INDEX GIVEN FROM FRONT, ITS BETTER
router.put('/put-one-room-date/:id/:index/:bookedAtRoom/:bookedTillRoom', async (req,res)=>{
  let doc = await Room.findById(req.params.id);
  if(doc){
    indexString = req.params.index;
    indexNum = parseInt(indexString);
    doc.bookedAt[indexNum] = req.params.bookedAtRoom;
    doc.bookedTill[indexNum] = req.params.bookedTillRoom;
    await doc.save();
    res.send(doc);
  }
})


//Editing values - staff buissness
router.put('/edit-one-room/:id/:codex/:price/:beds/:wardrobes', async (req,res)=>{
  let doc = await Room.findById(req.params.id);
  if(doc){
    doc.roomId = req.params.codex;
    doc.price = req.params.price;
    doc.bedCount = req.params.beds;
    doc.wardrobes = req.params.wardrobes;
    await doc.save()
    res.send(doc);
  }else{
    console.log("nisam nasao taj element")
  }
})



//Delete One room
router.delete("/delete-room/:id", (req, res) => {
  Room.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/Room" }); // redirect to an url
      fs.unlink("../client/app-hotel/src/assets/" + result.imgSrc, (err) => {
        if (err) throw err;
      });
    })
    .catch((err) => {
      console.log(`${err} : DeleteOneRoom`);
    });
});
//DELETE BASED ON INDEX GIVEN FROM FRONT. ITS BETTER
router.delete("/delete-one-room-date/:id/:index", async (req,res)=>{
  let doc = await Room.findById(req.params.id);
  if(doc){
    indexString = req.params.index;
    indexNum = parseInt(indexString);
    doc.bookedAt.splice(indexNum, 1);
    doc.bookedTill.splice(indexNum, 1);
    if(doc.bookedAt.length == 0){
      doc.booked = false;
    }
    await doc.save()
    res.send(doc);
  }else{
    console.log("didn't find that one...")
  }
})


module.exports = router;
