var express = require("express");
const Reservation = require("../models/reservationModel");

var router = express.Router();

//Get All Reservation
router.get("/all-reservation", (req, res) => {
  Reservation.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(`${err} : GetAllReservation`);
    });
});

//Get One Of Reservation for given Client
router.get("/single-reservation/:clientId", (req, res) => {
  Reservation.findOne({
    clientId: { $all: req.params.clientId },
  })
    .then((result) => {
      // console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(`${err} : GetOneReservation`);
    });
});

//Post One Reservation
//clientId/:roomId?/:auditoriumId?/:bookedAt?/:bookedTill?
// req.body.clientId
router.post("/post-reservation", async (req, res) => {
  let doc = await Reservation.findOne({
    clientId: { $all: req.body.clientId },
  });
  if (doc) {
    if (req.body.roomId) {
      doc.roomRef.roomId.push(req.body.roomId);
      doc.roomRef.bookedAt.push(req.body.bookedAtRoom);
      doc.roomRef.bookedTill.push(req.body.bookedTillRoom);
      // ODAVDE DODAJ CODEX AND PRICE
      doc.roomRef.codex.push(req.body.codexRoom);
      doc.roomRef.price.push(req.body.priceRoom);
    }
    if (req.body.auditoriumId) {
      doc.auditoriumRef.auditoriumId.push(req.body.auditoriumId);
      doc.auditoriumRef.bookedAt.push(req.body.bookedAtAudi);
      // ODAVDE DODAJ CODEX AND PRICE
      doc.auditoriumRef.codex.push(req.body.codexAudi);
      doc.auditoriumRef.price.push(req.body.priceAudi);
    }
    await doc.save();
    console.log("Old!");
    res.send(doc);
  } else {
    const reservation = new Reservation();

    reservation.clientId = req.body.clientId;
    reservation.roomRef = {
      roomId: req.body.roomId,
      bookedAt: req.body.bookedAtRoom,
      bookedTill: req.body.bookedTillRoom,
      codex: req.body.codexRoom,
      price: req.body.priceRoom,
    };
    reservation.auditoriumRef = {
      auditoriumId: req.body.auditoriumId,
      bookedAt: req.body.bookedAtAudi,
      codex: req.body.codexAudi,
      price: req.body.priceAudi,
    };
    console.log("New!");
    reservation
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(`${err} : PostOneReservation`);
        return;
      });
  }
});

// UPDATE BASED ON INDEX GIVEN FROM FRONT-END, ITS BETTER
router.put("/put-one-reservation-room/:id/:index/:bookedAtRoom/:bookedTillRoom", async (req, res) => {
  let doc = await Reservation.findById(req.params.id);
  if(doc) {
    indexString = req.params.index;
    indexNum = parseInt(indexString);
    doc.roomRef.bookedAt[indexNum] = req.params.bookedAtRoom;
    doc.roomRef.bookedTill[indexNum] = req.params.bookedTillRoom;
    await doc.save()
    res.send(doc);
  }else {
    console.log("didn't find that")
  }
});
// UPDATE BASED ON INDEX GIVEN FROM FRONT-END, ITS BETTER
router.put("/put-one-reservation-auditorium/:id/:index/:bookedAtAudi", async (req, res) => {
  let doc = await Reservation.findById(req.params.id);
  if(doc) {
    indexString = req.params.index;
    indexNum = parseInt(indexString);
    doc.auditoriumRef.bookedAt[indexNum] = req.params.bookedAtAudi;
    await doc.save()
    res.send(doc);
  }else {
    console.log("didn't find that")
  }
});
//Delete One Reservation
router.delete("/delete-reservation/:id", (req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ redirect: "/reservation" }); // redirect to an url
    })
    .catch((err) => {
      console.log(`${err} : DeleteOneReservation`);
    });
});

// DELETE BASED ON INDEX GIVEN FROM FRONT. ITS BETTER
router.delete("/delete-one-reservation-room/:id/:index", async (req, res) => {
  let doc = await Reservation.findById(req.params.id);
  if (doc) {
    indexString = req.params.index;
    indexNum = parseInt(indexString);
    doc.roomRef.roomId.splice(indexNum, 1);
    doc.roomRef.codex.splice(indexNum, 1);
    doc.roomRef.bookedAt.splice(indexNum, 1);
    doc.roomRef.bookedTill.splice(indexNum, 1);
    doc.roomRef.price.splice(indexNum, 1);
    await doc.save();
    res.send(doc);
  } else {
    console.log("didn't find that");
  }
});
// DELETE BASED ON INDEX GIVEN FROM FRONT. ITS BETTER
router.delete(
  "/delete-one-reservation-auditorium/:id/:index",
  async (req, res) => {
    let doc = await Reservation.findById(req.params.id);
    if (doc) {
      indexString = req.params.index;
      indexNum = parseInt(indexString);
      doc.auditoriumRef.auditoriumId.splice(indexNum, 1);
      doc.auditoriumRef.codex.splice(indexNum, 1);
      doc.auditoriumRef.bookedAt.splice(indexNum, 1);
      doc.auditoriumRef.price.splice(indexNum, 1);
      await doc.save();
      res.send(doc);
    } else {
      console.log("didn't find that");
    }
  }
);
module.exports = router;
