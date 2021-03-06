const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  recipeId: {
    type: String,
    required: true
  },
  dateOfEvent: {
    type: Date,
    required: true
  },
  notes: String,
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
});

module.exports = mongoose.model('Event', schema);
