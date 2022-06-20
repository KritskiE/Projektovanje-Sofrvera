var express = require("express");
const Auditorium = require("../models/auditoriumModel");
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

//Get All Staff
router.get("/all-auditorium", (req, res) => {
  Auditorium.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`${err} : GetAllAuditorium`);
    });
});

//Get One Of Staff
router.get("/single-auditorium/:id", (req, res) => {
  Auditorium.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Post One Staff
router.post(
  "/post-auditorium/:auditoriumId/:name/:price/:seats/:surface/:stage/:projector/:sound/:stars",
  upload.single("productImage"),
  (req, res) => {
    const auditorium = new Auditorium({
      auditoriumId: req.params.auditoriumId,
      name: req.params.name,
      price: req.params.price,
      imgSrc: date_now + req.file.originalname,
      booked: false,
      seats: req.params.seats,
      surface: req.params.surface,
      stage: req.params.stage,
      projector: req.params.projector,
      sound: req.params.sound,
      stars: req.params.stars,
    });

    auditorium
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(`${err} : PostOneAuditorium`);
      });
  }
);
//Add Dates to Auditorium
router.post("/add-dates-auditorium", async (req, res) => {
  let doc = await Auditorium.findOne({ _id: req.body.auditorium });
  doc.bookedAt.push(req.body.bookedAtAudi);
  doc.booked = true;
  await doc.save();
  res.send("success");
});
// Update One Auditorium
router.patch("/patch-auditorium/:id", (req, res) => {
  Auditorium.findById(req.params.id).then(async (result) => {
    result.booked = req.body.booked;
    //resio si sa json u postmanu
    result.bookedAt = req.body.bookedAt;
    await result.save();
    res.send("success");
  });
});
/* 
********************************************
* Express put() funkcija koja menja atribute jedne sale i smesta promene u bazu podataka 
* HTTP request: 'http://localhost:3000/api/auditorum/put-one-auditorium-date/:id/:index/:bookedAtAudi'
* Programer: Dusan Ilic
<--- Verzija 1 --->
* Problem: request.params.id vraca vrednost tipa String
* Testiranje obavljeno Postmanom, ne menjajuci bazu podataka
<--- Verzija 2 --->
* Resenje: potreban je tip Number za upotrebu kao index niza, vodeci se time smo primenili funkciju parseInt(req.params.index)
********************************************
*/

//PUT BASED ON INDEX GIVEN FROM FRONT, ITS BETTER
router.put('/put-one-auditorium-date/:id/:index/:bookedAtAudi', async (req,res)=>{
  let doc = await Auditorium.findById(req.params.id);
  if(doc){
    indexString = req.params.index;
    indexNum = parseInt(indexString);
    doc.bookedAt[indexNum] = req.params.bookedAtAudi;
    await doc.save();
    res.send(doc);
  }
});


//Editing values - staff buissness
router.put('/edit-one-auditorium/:id/:codex/:price/:seats/:stage/:projector', async(req,res)=>{
  let doc = await Auditorium.findById(req.params.id);
  if(doc){
    doc.name = req.params.codex;
    doc.price = req.params.price;
    doc.seats = req.params.seats;
    doc.stage = req.params.stage;
    doc.projector = req.params.projector;
    await doc.save()
    res.send(doc);
  }else{
    console.log("nisam nasao taj element.")
  }
})


//Delete One Auditorium
router.delete("/delete-auditorium/:id", (req, res) => {
  Auditorium.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/Auditorium" }); // redirect to an url
      fs.unlink("../client/app-hotel/src/assets/" + result.imgSrc, (err) => {
        if (err) throw err;
      });
    })
    .catch((err) => {
      console.log(`${err} : DeleteOneAuditorium`);
    });
});
//DELETE BASED ON INDEX GIVEN FROM FRONT. ITS BETTER
router.delete("/delete-one-auditorium-date/:id/:index", async (req,res)=>{
  let doc = await Auditorium.findById(req.params.id);
  if(doc){
    indexString = req.params.index;
    indexNum = parseInt(indexString);
    doc.bookedAt.splice(indexNum, 1);
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
