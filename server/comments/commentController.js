// Comment Controller
// ------------------
//
// The comment controller handles requests passed from the comment router. 

// The Q module is used to bind Mongoose methods to use promises.
var Q = require('q');
// var Comment = require('./commentModel.js');
var User = require('../users/usersModel.js');
var Idea = require('../ideas/ideaModel.js');

module.exports = {

  // // Retrieve all of the comments for a given idea from the MongoDB database.
  allComments: function(req, res, next) {
    
  //   // Bind the Mongoose find method to the Comment model, so that the Q module can use promises with it.
  //   var findAllComments = Q.nbind(Comment.find, Comment);
    
  //   // Find all comments for a given idea. Send back the array of comments.
  //   findAllComments({idea_id: req.body.idea_id})
  //     .then(function(ideas) {
  //       res.json(comments);
  //     })
  //     .fail(function(error) {
  //       next(error);
  //     });
  },

  // Add a new comment to the MongoDB database.
  newComment: function(req, res, next) {
    var comment = req.body;
    console.log('comment:', comment);

    var findIdea = Q.nbind(Idea.findOne, Idea);
    findIdea( {_id: comment.idea_id } )
      .then(function (idea) {
        console.log('idea is: ', idea);
        if (!idea) {
          next(new Error('Idea does not exist'));
        } else {
          idea.comments.push({
            text: comment.text,
            created_by: comment.created_by,
          });
          idea.save(function(err){
            if (err) return handleError(err);
            console.log('updated idea is: ', idea);
            res.send(idea);
          });
        }
      })
      .fail(function (error) {
        next(error);
      });
  }

};
