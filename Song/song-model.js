const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: { type: String, required: true },
  singer: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  album: { type: Schema.Types.ObjectId, ref: 'Album', required: true },
  
}, {
  timestamps: true, 
});

module.exports = mongoose.model("Song", songSchema);
