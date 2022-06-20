const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auditoriumSchema = new Schema(
  {
    auditoriumId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgSrc:{
      type: String,
      required: true
    },
    booked: {
      type: Boolean,
      required: true,
    },
    bookedAt: {
        type: [String],
        required: false,
    },
    seats: {
      type: Number,
      required: true,
    },
    surface: {
      type: String,
      required: true,
    },
    stage: {
      type: Boolean,
      required: true,
    },
    projector: {
      type: Boolean,
      required: true,
    },
    sound: {
      type: Boolean,
      required: true,
    },
    stars:{
      type: Number,
      required: false,
    }
  },
  { timestamps: true }
);

const Auditorium = mongoose.model("auditorium", auditoriumSchema);

module.exports = Auditorium;
