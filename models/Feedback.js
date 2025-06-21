const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  transportType: { type: String, required: true },
  routeNumber: { type: String, required: true },
  feedbackText: { type: String, required: true },
  status: { type: String, default: 'new' }  // 'new' or 'reviewed'
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
