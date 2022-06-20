const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  clientId: {
    type: [{ type: Schema.Types.ObjectId, ref: "Client" }],
    required: true,
  },
  roomRef: {
    type: {
      roomId: [{ type: Schema.Types.ObjectId, ref: "Room" }],
      codex: [{type: String}],
      bookedAt: [{ type: Schema.Types.String }],
      bookedTill: [{ type: Schema.Types.String }],
      price: [{type: Number}]
    },
    required: false,
  },
  auditoriumRef: {
    type: {
      auditoriumId: [{ type: Schema.Types.ObjectId, ref: "Auditorium" }],
      codex: [{type: String}],
      bookedAt: [{ type: Schema.Types.String }],
      price: [{type: Number}]
    },
    required: false,
  },
});

const Reservation = mongoose.model("reservation", reservationSchema);

module.exports = Reservation;

//[{ type: Schema.Types.ObjectId, ref: "Auditorium" }]
