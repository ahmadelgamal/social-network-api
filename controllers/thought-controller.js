const { Thought, User } = require('../models');

const thoughtController = {
  // read all thoughts
  readAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => {
        if (dbThoughtData.length === 0) return res.status(404).json({ message: 'No thoughts found in database!' })
        res.json(dbThoughtData)
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create thought and associate it to user automatically
  // duplicate thoughts are alllowed on purpose
  createThought({ body }, res) {
    User.findOne({ _id: body.userId })
      .then(dbUserData => {
        if (!dbUserData) return res.status(404).json({ message: 'No user found with this id!' });

        Thought.create(body)
          .then(dbThoughtData => {
            res.json(dbThoughtData);

            User.findOneAndUpdate(
              { _id: body.userId },
              { $addToSet: { thoughts: dbThoughtData._id } },
              { new: true, runValidators: true }
            )
              .then(dbAddedThoughtData => {
                return;
              })
              .catch(err => res.json(err));
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  },

  // read thought by id
  readThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) return res.status(404).json({ message: 'No thought found with this id' })
        res.json(dbThoughtData)
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) return res.status(404).json({ message: 'No thought found with this id!' });
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // delete thought by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(dbThoughtData => {
        if (!dbThoughtData) return res.status(404).json({ message: 'No thought found with this Id!' });
        res.json({ message: 'Thought deleted successfully!' })

        User.findOneAndUpdate(
          { _id: dbThoughtData.userId },
          { $pull: { thoughts: dbThoughtData } },
          { new: true, runValidators: true },
        )
      })
      .catch(err => res.json(err));
  },

  // create a reaction stored in a single thought's reactions array field
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true },
    )
      .then(dbReactionData => {
        if (!dbReactionData) return res.status(404).json({ message: 'No thought found with this id!' });
        res.json(dbReactionData);
      })
      .catch(err => res.json(err));
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
    )
      .then(dbReactionData => {
        for (let i = 0; i < dbReactionData.reactions.length; i++) {
          const reactionId = dbReactionData.reactions[i].reactionId.toString();
          if (reactionId === params.reactionId) {
            res.json({ message: 'Reaction deleted successfully!' });
            return;
          }
        }
        res.status(404).json({ message: 'No reaction found with this id!' });
        return;
      })
      .catch(err => res.json(err));
  },

};

module.exports = thoughtController;