// Auth controller
// ---------------
//
// This feature is not finished yet. Current target is not to implement actual authorization, but simply to link users to ideas (and eventually comments).

angular.module('glint.auth', [])

.controller('AuthCtrl', function($window, $location, Auth, UserInfo){
  var self = this;
  self.user = {}; 

  // Allow user to declare who they are to the system.
  self.login = function() {
    self.user.username = _.escape(self.user.username);
    self.user.password = _.escape(self.user.password);
    var user = JSON.stringify(self.user);

    Auth.signin(user)
      .then(function (session){
        UserInfo.setUsername(session.username);
        UserInfo.setId(session.id);
        // console.log(UserInfo.getUsername());
        // console.log(UserInfo.getId());
        $window.localStorage.setItem('com.glint', JSON.stringify(session));
        $location.path('/');
      })
      .catch(function (error){
        console.error('login error', error);
      });
  };

  // Allow user to first-time identify themselves to the system.
  self.signup = function() {
    self.user.username = _.escape(self.user.username);
    self.user.password = _.escape(self.user.password);
    var user = JSON.stringify(self.user);

    Auth.signup(user)
      .then(function (session){
        $window.localStorage.setItem('com.glint', JSON.stringify(session));
        $location.path('/');
      })
      .catch(function (error){
        console.error('signup error', error);
      });
  };
});
