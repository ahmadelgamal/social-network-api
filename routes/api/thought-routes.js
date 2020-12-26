const router = require('express').Router();

const {
  readAllThoughts,
  createThought,
  readThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// Read ALL Thoughts OR Create One Thought:
// (push the created thoughtId to the associated user's thoughts array field)
// /api/thoughts
router.route('/')
  .get(readAllThoughts)
  .post(createThought);

// RUD One Thought by its Id:
// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(readThought)
  .put(updateThought)
  .delete(deleteThought);

// Create One Reaction by Thought Id:
// POST to create a reaction stored in a single thought's reactions array field
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(createReaction);

// Delete One Reaction by Thought Id and Reaction Id:
// DELETE to pull and remove a reaction by the reaction's reactionId value
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;