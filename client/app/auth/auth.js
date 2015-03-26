// Auth controller
// ---------------
//
// This feature is not finished yet. Current target is not to implement actual authorization, but simply to link users to ideas (and eventually comments).

angular.module('glint.auth', [])

.controller('AuthCtrl', function($window, $location, Auth){
  var self = this;
  self.user = {};

  // Allow user to declare who they are to the system.
  self.login = function() {
    self.user.username = _.escape(self.user.username);
    self.user.password = _.escape(self.user.password);
    var user = JSON.stringify(self.user);

    Auth.signin(user)
      .then(function (session){
        $window.localStorage.setItem('com.glint', session.token);
        $window.localStorage.setItem('com.glint.user', session.userName);
        $location.path('/');
      })
      .catch(function (error){
        console.error('login error', error);
      });
  };

  // Allow user to first-time identify themselves to the system.
  self.signup = function() {
    console.log('signing you up');
    self.user.username = _.escape(self.user.username);
    self.user.password = _.escape(self.user.password);
    var user = JSON.stringify(self.user);

    Auth.signup(user)
      .then(function (token){
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/');
      })
      .catch(function (error){
        console.error('signup error', error);
      });
  };
});
