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

// Read ALL Thoughts OR Create One Thought: /api/thoughts
router.route('/')
  .get(readAllThoughts)
  .post(createThought);

// RUD One Thought by Id: /api/thoughts/<thoughtId>
router.route('/:thoughtId')
  .get(readThought)
  .put(updateThought)
  .delete(deleteThought);

// // Create One Reaction by Thought Id: /api/thoughts/<thoughtId>/reactions
// router.route('/:thoughtId/reactions')
//   .post(createReaction);

// // Delete One Reaction by Thought Id and Reaction Id: /api/thoughts/<thoughtId>/reactions/<reactionId>
// router.route('/:thoughtId/reactions/:reactionId')
//   .delete(deleteReaction);

module.exports = router;