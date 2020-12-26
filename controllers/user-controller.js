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
      .then(dbUserData => {
        console.log(dbUserData);
        if (dbUserData.length === 0) return res.status(404).json({ message: 'No users found in database!' })
        res.json(dbUserData)
      })
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
      .then(dbUserData => {
        if (!dbUserData) return res.status(404).json({ message: 'No user found with this id' })
        res.json(dbUserData)
      })
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
        if (!dbUserData) return res.status(404).json({ message: 'No user found with this id!' })
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // TODO: delete associated thoughts
  // delete a user by its id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => {
        if (!dbUserData) return res.status(
          404).json({ message: 'No user found with this Id' })
        res.json({ message: 'User and associated thoughts deleted successfully' })
      })
      .catch(err => res.json(err))
  },

  // add a friend (by friendId) to user (by userId)
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true },
    )
      .then(dbUserData => {
        console.log(dbUserData + ' Friend added successfully!');
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete a friend by by userId and friendId
  removeFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true },
    )
      .then(dbUserData => {
        console.log(dbUserData + ' Friend removed successfully!');
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

};

module.exports = userController;