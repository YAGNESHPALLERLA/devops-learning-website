const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  hr: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  scheduledAt: { type: Date, required: true },
  // other fields (status, notes, etc.)
});
module.exports = mongoose.model("Interview", InterviewSchema);
