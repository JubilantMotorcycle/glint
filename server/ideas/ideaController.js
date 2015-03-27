// Idea Controller
// ---------------
//
// The idea controller handles requests passed from the idea router.

// The Q module is used to bind Mongoose methods to use promises.
var Q = require('q');
var Idea = require('./ideaModel.js');

module.exports = {

  // Retrieve all of the ideas that exist in the MongoDB database.
  allIdeas: function(req, res, next) {
    
    // Bind the Mongoose find method to the Idea model, so that the Q module can use promises with it.
    var findAllIdeas = Q.nbind(Idea.find, Idea);
    
    findAllIdeas({})
      .then(function(ideas) {
        res.json(ideas);
      })
      .fail(function(error) {
        next(error);
      });
  },

  oneIdea: function(req, res, next) {

    var idea_id = req.url.slice(1);

    // Bind the Mongoose find method to the Idea model, so that the Q module can use promises with it.
    var query = Idea.where({ _id: idea_id });
    query.findOne(function(err, idea){
      if (err) return handleError(err);
      if (idea) {
        res.json(idea);
      } else {
        res.send(404);
      }
    });
  },

  // Add a new idea to the MongoDB database.
  newIdea: function(req, res, next) {

    // Bind the Mongoose create method to the Idea model, so that the Q module can use promises with it.
    var createIdea = Q.nbind(Idea.create, Idea);
    console.log(req.body);

    // Create a new document from the Idea model. If successfully created then the new Idea document is returned.
    var newIdea = {
      title: req.body.title,
      text: req.body.text,
      created_by: req.body.created_by,
    };

    createIdea(newIdea)
      .then(function (createdIdea) {
        if (createdIdea) {
            res.json(createdIdea);
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  // Edit the idea description in the database
  editDescription: function(req, res, next) {

    var idea_id = req.url.slice(1);

    console.log(idea_id);
    console.log(req.body.newDescription);

    // Bind the Mongoose create method to the Idea model, so that the Q module can use promises with it.a.create, Idea);

    var query = Idea.where({ _id: idea_id });
    query.findOne(function(err, idea){
      if (err) return handleError(err);
      if (idea) {
        idea.text = req.body.newDescription;
        idea.save(function(err){
          if (err) return handleError(err);
          res.send(idea);
        });
      } else {
        res.send(404);
      }
    });

    // Create a new document from the Idea model. If successfully created then the new Idea document is returned.
    var newIdea = {
      title: req.body.title,
      text: req.body.text,
      created_by: req.body.created_by,
    };
  }

};
