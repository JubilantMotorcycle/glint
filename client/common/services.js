var glintServices = angular.module('glint.services', []);

glintServices.factory('Ideas', function ($http){

  var getIdeas = function (){
    return $http({
      method: 'GET',
      url: '/api/ideas'
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('getIdeas error', error);
    });
  };

  var createIdea = function (idea){
    return $http({
      method: 'POST',
      url: '/api/ideas',
      data: idea
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('createIdeas error', error);
    });
  };

  return {
    getIdeas: getIdeas,
    createIdea: createIdea
  };
});

glintServices.factory('IdeaDetail', function ($http){

  var getIdea = function(idea_id){
    return $http({
      method: 'GET',
      url: '/api/ideas/' + idea_id
    }).then(function (response){
      console.log('factory sees:', response);
      return response.data;
    }).catch(function (error) {
      console.error('getIdeas error', error);
    });
  }

  var addCollaborator = function(collab){
    console.log('factory adding collab');
    return $http({
      method: 'POST',
      url: '/api/collaborators/',
      data: collab 
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('createIdeas error', error);
    });
  };

  var removeCollaborator = function(user_id){

  };

  return {
    getIdea: getIdea,
    addCollaborator: addCollaborator,
    removeCollaborator: removeCollaborator
  };
});

glintServices.factory('Votes', function($http){

  var upvote = function (idea){
    return $http({
      method: 'POST',
      url: '/api/vote/upvote',
      data: idea
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error) {
      console.error('upvote error', error);
    });
  };

  var downvote = function (idea){
    return $http({
      method: 'POST',
      url: '/api/vote/downvote',
      data: idea
    })
    .then(function (response){
      return response.data;
    })
    .catch(function (error) {
      console.error('downvote error', error);
    });
  };

  return {
    upvote: upvote,
    downvote: downvote
  };
});

glintServices.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      console.log("client side", resp.data);
      return resp.data;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});

glintServices.factory('Comments', function ($http){
  
  var createComment = function (comment){
    return $http({
      method: 'POST',
      url: '/api/comments',
      data: comment
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('createComments error', error);
    });

  };

  var getComments = function (idea_id){
    return $http({
      method: 'GET',
      url: '/api/comments',
      data: idea_id
    }).then(function (response){
      return response.data;
    }).catch(function (error) {
      console.error('getComments error', error);
    });
  };

  return {
    createComment: createComment,
    getComments: getComments
  };
});

