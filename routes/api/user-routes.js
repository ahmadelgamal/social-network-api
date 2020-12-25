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

// Create/Delete One Friend by User Id and Friend Id
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;