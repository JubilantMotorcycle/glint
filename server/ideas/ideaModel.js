// Idea Model
// ----------
//
// The Idea model defines the structure of all of the Idea documents created.

var mongoose = require('mongoose');

var IdeaSchema = new mongoose.Schema({
    id: mongoose.Schema.ObjectId,
    title: String,
    text: { type: String, default: '' },
    votes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    created_by: { type: String, default: 'anonymous' },
    created_at: { type: Date, default: Date.now },
    category: { type: String, default: '' },
    tags: [String],
    roles: [String],
    collaborators: [{
      username: String,
      role: String
    }],
    comments: [{
      text: String,
      created_by: { type: String, default: 'anonymous' },
      created_at: { type: Date, default: Date.now },
    }],
    delete_flag: { type: Boolean, default: false }
});

module.exports = mongoose.model('Idea', IdeaSchema);
