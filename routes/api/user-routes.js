const router = require('express').Router();

const {
  readAllUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require('../../controllers/user-controller');


// Read ALL Users OR Create One User: /api/Users
router.route('/')
  .get(readAllUsers)
  .post(createUser)

// RUD One User by Id: /api/users/<userId>
router.route('/:userId')
  .get(readUser)
  .put(updateUser)
  .delete(deleteUser);

// // Create One Friend by User Id: /api/users/<userId>/friends
// router.route('/:userId/friends')
//   .post(createFriend);

// // Delete One Friend by User Id and Friend Id: /api/users/<userId>/friends/<friendId>
// router.route('/:userId/friends/:friendId')
//   .delete(deleteFriend);

module.exports = router;