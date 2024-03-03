const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: { type: String, required: true }, 
  description: String,
  showNbTracks: {
    type: Number,
    default: 0,
  },
  lastSongAddedAt: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true, 
});

module.exports = mongoose.model("Album", albumSchema);
