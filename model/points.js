const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  user: { type: String },
  point: { type: Number },
  guild: { type: String }
});

module.exports = mongoose.model('point', schema);
