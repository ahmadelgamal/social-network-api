const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    // the following match also limits the email extension length between 2 and 17 characters. At the time of coding the longest "coming soon" extension was: "vermögensberatung". For reference, please visit: https://www.godaddy.com/domains/gtld-domain-names
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,17})+$/, 'Please fill a valid email address']
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  // friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;