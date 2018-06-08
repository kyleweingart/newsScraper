var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// create Comment schema
var CommentSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  body: {

    type: String,
    required: true

  }
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
