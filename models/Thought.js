const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
  {

  }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;