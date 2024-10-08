const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    fighter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fighter",
      required: true,
    },

    isChampionship: {
      type: Number,
      required: true,
    },
    result: {
      type: Number, // 1 for win, 0 for loss, 0.5 for draw
      required: true,
    },
    kd: {
      type: Number,
      required: true,
    },
    sig: {
      type: Number,
      required: true,
    },
    takedowns: {
      type: Number,
      required: true,
    },
    subAttempts: {
      type: Number,
      required: true,
    },
    knockoutSub: {
      type: Number,
      required: true, // 1 means yes 0 means no
    },
    ksubloss: {
      type: Number,
      required: true, // 1 means yes 0 means no
    },
    firstRoundFinish: {
      type: Number,
      required: true, // 1 means yes 0 means no
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
