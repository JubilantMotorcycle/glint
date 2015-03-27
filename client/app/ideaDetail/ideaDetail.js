// Ideas controller
// ----------------
//

// The pattern we're using here is the pattern we're using across all our controllers: the controllerAs syntax. This syntax is for Angular versions 1.2 and up, and means you don't have to use `$scope` anymore. Instead, inside of your HTML, you declare your controller with `ng-controller="IdeasCtrl as ictrl"` and reference your variables within that controlled scope as `ictrl.<varname>`. Additionally, instead of setting your properties within your controller to `$scope`, assign your controller's `this` to a variable called self and set your properties to that.
angular.module( 'glint.ideaDetail', [] )
  .controller( 'IdeaCollaboratorsCtrl', function( $stateParams, IdeaDetail, Ideas, $filter, $route ) {
    var self = this;

    self.newCollaborator = {};
    self.newComment = {};



    self.init = function() {

      self._id = $stateParams._id;
      console.log(self._id);
      IdeaDetail.getIdea( self._id ).then( function( idea ) {
        self.idea = idea;
        console.log(self.idea);
        self.collaborators = self.idea.collaborators;
        self.comments = self.idea.comments;

        // TODO: figure out whether current user is creator or a collaborator
        // self.userIsCreator =
        // self.userIsCollaborator =
      } );
    };

    // Submit a new idea.
    self.submitCollaborator = function( $timeout ) {
      console.log( 'submitting yourself as a collaborator' );

      // Escape user input.
      self.newCollaborator.created_by = 'Miguel';
      self.newCollaborator.idea_id = self._id;
      self.newCollaborator.role = _.escape( self.newCollaborator.role );
      var collab = JSON.stringify( self.newCollaborator );
      console.log( "collab: ", collab );

      // POST new idea, display confirmation, redisplay all ideas.
      IdeaDetail.addCollaborator( collab )
        .then( function( response ) {
          self.init();
          self.newCollaborator = {};
        } )
        .catch( function( error ) {
          console.error( 'createIdea error', error );
        } );

    };

    // Submit form inputs to the db and display something back to the user on success.
    self.submitComment = function (idea_id){
      // if(nav.token.userName){

      // Escape user input.
      self.newComment.created_by = 'Gertrude';
      self.newComment.idea_id = self._id;
      self.newComment.text = _.escape( self.newComment.text );
      var comm = JSON.stringify( self.newComment );
      console.log( "comm: ", comm );

      // POST new comment, redisplay all ideas.
      IdeaDetail.createComment( comm )
        .then(function (response){
          self.init();
          self.newComment = {};
        })
        .catch(function (error){
          console.error('newComment error', error);
        });
      // }else{
      //   console.log('not logged in')
      // }
    };

    self.init();
  } );
