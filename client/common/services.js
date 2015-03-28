var glintServices = angular.module( 'glint.services', [] );

glintServices.factory( 'Ideas', function( $http ) {

  var getIdeas = function() {
    return $http( {
      method: 'GET',
      url: '/api/ideas'
    } ).then( function( response ) {
      return response.data;
    } ).catch( function( error ) {
      console.error( 'getIdeas error', error );
    } );
  };

  var createIdea = function( idea ) {
    return $http( {
      method: 'POST',
      url: '/api/ideas',
      data: idea
    } ).then( function( response ) {
      return response.data;
    } ).catch( function( error ) {
      console.error( 'createIdeas error', error );
    } );
  };

  return {
    getIdeas: getIdeas,
    createIdea: createIdea
  };
} );

glintServices.factory( 'IdeaDetail', function( $http ) {

  var getIdea = function( idea_id ) {
    return $http( {
      method: 'GET',
      url: '/api/ideas/' + idea_id
    } ).then( function( response ) {
      // console.log( 'factory sees:', response );
      return response.data;
    } ).catch( function( error ) {
      console.error( 'getIdeas error', error );
    } );
  };

  var editDescription = function( idea_id, data ) {
    console.log( 'factory editing description with data ', data );
    return $http( {
      method: 'PUT',
      url: '/api/ideas/' + idea_id,
      data: data
    } ).then( function( response ) {
      console.log(response);
      return response.data;
    } ).catch( function( error ) {
      console.log( 'editDescription error', error );
    } );
  };

  var deleteIdea = function( idea_id ) {
    console.log( 'factory deleting idea' );
    return $http( {
      method: 'DELETE',
      url: '/api/ideas/' + idea_id,
    } ).then( function( response ) {
      console.log(response);
      return response.data;
    } ).catch( function( error ) {
      console.log( 'deleteIdea error', error );
    } );
  };

  var addCollaborator = function( collab ) {
    console.log( 'factory adding collab' );
    return $http( {
      method: 'POST',
      url: '/api/collaborators/',
      data: collab
    } ).then( function( response ) {
      return response.data;
    } ).catch( function( error ) {
      console.error( 'createIdeas error', error );
    } );
  };

  var editCollaborator = function( user_id ) {
  };

  var removeCollaborator = function( user_id ) {
  };

  var createComment = function( comment ) {
    console.log('factory creating your comment');
    return $http( {
      method: 'POST',
      url: '/api/comments/',
      data: comment
    } ).then( function( response ) {
      return response.data;
    } ).catch( function( error ) {
      console.error( 'createComments error', error );
    } );
  };

  // not necessary at this scale, because getIdeas returns all comments
  // var getComments = function( idea_id ) {
  //   return $http( {
  //     method: 'GET',
  //     url: '/api/comments',
  //     data: idea_id
  //   } ).then( function( response ) {
  //     return response.data;
  //   } ).catch( function( error ) {
  //     console.error( 'getComments error', error );
  //   } );
  // };

  var editCollaborator = function( user_id ) {
  };

  var removeCollaborator = function( user_id ) {
  };

  return {
    getIdea: getIdea,
    editDescription: editDescription,
    deleteIdea: deleteIdea,

    addCollaborator: addCollaborator,
    removeCollaborator: removeCollaborator,

    createComment: createComment,
    // getComments: getComments
  };
} );

glintServices.factory( 'Votes', function( $http ) {

  var upvote = function( idea ) {
    return $http( {
        method: 'POST',
        url: '/api/vote/upvote',
        data: idea
      } )
      .then( function( response ) {
        return response.data;
      } )
      .catch( function( error ) {
        console.error( 'upvote error', error );
      } );
  };

  var downvote = function( idea ) {
    return $http( {
        method: 'POST',
        url: '/api/vote/downvote',
        data: idea
      } )
      .then( function( response ) {
        return response.data;
      } )
      .catch( function( error ) {
        console.error( 'downvote error', error );
      } );
  };

  return {
    upvote: upvote,
    downvote: downvote
  };
} );


  glintServices.factory( 'Auth', function( $http, $location, $window, $state ) {
    var signin = function( user ) {
      console.log( "check check" );
      return $http( {
          method: 'POST',
          url: '/api/users/signin',
          data: user
        } )
        .then( function( resp ) {
          console.log( "client side", resp.data );
          return resp.data;
        } );
    };

    var signup = function( user ) {
      return $http( {
          method: 'POST',
          url: '/api/users/signup',
          data: user
        } )
        .then( function( resp ) {
          return resp.data;
        } );
    };

    var isAuth = function() {
      return !!$window.localStorage.getItem( 'com.glint' );
    };

    var signout = function () {
      $window.localStorage.removeItem('com.glint');
      $state.go('login');
    };

    return {
      signin: signin,
      signup: signup,
      isAuth: isAuth,
      signout: signout
    };
  } );

  glintServices.factory( 'UserDetails', function( $http ) {

    var getUser = function( username ) {
      return $http( {
        method: 'GET',
        url: '/api/users/' + username
      } ).then( function( response ) {
        console.log( 'getUsers sees:', response );
        return response.data;
      } ).catch( function( error ) {
        console.error( 'getUsers error', error );
      } );
    }

    return {
      getUser: getUser,
    };
  } );

  glintServices.factory( 'UserInfo', function() {
    var username = 'not available';
    var id = null;

    var setUsername = function(user){
      username = user;
    };
    var setId = function(userid){
      id = userid;
    };
    var getUsername = function(){
      return username;
    };
    var getId = function(){
      return id;
    };

    return {
      setUsername: setUsername,
      setId: setId,
      getUsername: getUsername,
      getId: getId,
    };
  });


// merged into IdeaDetail factory
// glintServices.factory( 'Comments', function( $http ) {
//   var createComment = function( comment ) {
//     return $http( {
//       method: 'POST',
//       url: '/api/comments',
//       data: comment
//     } ).then( function( response ) {
//       return response.data;
//     } ).catch( function( error ) {
//       console.error( 'createComments error', error );
//     } );

//   };

//   var getComments = function( idea_id ) {
//     return $http( {
//       method: 'GET',
//       url: '/api/comments',
//       data: idea_id
//     } ).then( function( response ) {
//       return response.data;
//     } ).catch( function( error ) {
//       console.error( 'getComments error', error );
//     } );
//   };

//   return {
//     createComment: createComment,
//     getComments: getComments
//   };
// } );

