const { User } = require('../models');

const userController = {
  // read (GET) all users
  readAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create (POST) a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // read (GET) a single user by its _id and populated thought and friend data
  readUser({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // update a user by its id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete a user by its id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => res.json(dbUserData + ' User deleted successfully'))
      .catch(err => res.json(err));
  }

    // BONUS: Remove a user's associated thoughts when deleted
    // deleteUser({ params }, res) {
    //   User.findOneAndDelete({ _id: params.userId })
    //     .then(dbUserData => res.json(dbUserData + ' User deleted successfully'))
    //     .catch(err => res.json(err));
    // }

};

module.exports = userController;