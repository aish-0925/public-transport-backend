const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Ensure path is correct

// ✅ GET /api/feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST /api/feedback (for submitting feedback)
router.post('/', async (req, res) => {
  const { transportType, routeNumber, feedbackText } = req.body;
  try {
    const newFeedback = new Feedback({
      transportType,
      routeNumber,
      feedbackText,
      status: 'new'
    });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// ✅ PUT /api/feedback/:id (for updating feedback status)
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update feedback status' });
  }
});

module.exports = router;
