const mongoose = require('mongoose');

// Define the Challenge schema
const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Challenge name is required'],
    trim: true,
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function (value) {
        // End date must be after start date
        return this.startDate < value;
      },
      message: 'End date must be after the start date',
    },
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  image: {
    type: String, // URL or path to the image
    required: [true, 'Image is required'],
  },
  levelType: {
    type: String,
    enum: ['easy', 'medium', 'hard'], // Only allow these values
    required: [true, 'Level type is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Create a Challenge model
const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
