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
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => res.json(dbThoughtData + ' Thought created successfully!'))
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
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData + ' Thought updated successfully!');
      })
      .catch(err => res.json(err));
  },

  // delete thought by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(dbThoughtData => {
        if(!dbThoughtData) return res.json('No thought found with this Id!');
        res.json(dbThoughtData + ' Thought deleted successfully!')
      })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;