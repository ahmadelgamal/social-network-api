const router = require('express').Router();

const {
  readAllUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');


// Read ALL Users OR Create One User:
// /api/Users
router.route('/')
  .get(readAllUsers)
  .post(createUser)

// RUD One User by its Id:
// /api/users/:userId
router.route('/:userId')
  .get(readUser)
  .put(updateUser)
  .delete(deleteUser);

// Create/Update (remove) One Friend by User Id and Friend Id
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .put(removeFriend);

module.exports = router;