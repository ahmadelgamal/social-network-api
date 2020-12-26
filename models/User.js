const { Schema, model } = require('mongoose');

// I chose to use camelCase, not PascalCase, to follow mongoosejs.com docs
const userSchema = new Schema(
  {
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
      // the following match ensures proper email format and limits the email extension length between 2 and 17 characters. At the time of coding the longest "coming soon" extension was: "vermögensberatung". For reference, please visit: https://www.godaddy.com/domains/gtld-domain-names
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,17})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;