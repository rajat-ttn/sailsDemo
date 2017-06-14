todoApp.service('LoginService', function($http, $q) {
  return {
    login: function(email,password) {
      var defer = $q.defer();
      var loginCredentials = {
        email : email,
        password:password
      };

      $http.post('/user/login',loginCredentials).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    signup: function(name, email,password) {
      var defer = $q.defer();
      var userInfo = {
        name: name,
        email : email,
        password:password
      };

      $http.post('/user/signup',userInfo).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    logout:function(){
      var defer = $q.defer();

      $http.post('/user/logout').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
  }
});