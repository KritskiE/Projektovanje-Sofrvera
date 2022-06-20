const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    roomId: {
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
    bookedTill: {
        type: [String],
        required: false,
    },
    bedCount: {
      type: Number,
      required: true,
    },
    bedType: {
      type: String,
      required: true,
    },
    terrace: {
      type: Boolean,
      required: true,
    },
    oriented: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    internetConnection: {
      type: Boolean,
      required: true,
    },
    wardrobes: {
      type: Number,
      required: false,
    },
    stars:{
      type: Number,
      required: false,
    }
  },
  { timestamps: true }
);

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
