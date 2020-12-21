const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {

  }
);

const User = model('User', UserSchema);

module.exports = User;