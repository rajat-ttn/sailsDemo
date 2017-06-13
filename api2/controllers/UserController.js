/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  signup: function(req,res){
    User.signup({
      name:req.param('name'),
      email:req.param('email'),
      password:req.param('password'),
    }, function(err, user){
      if(err){
        return res.negotiate(err);
      }

      req.session.me = user.id;

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the user agent know the signup was successful.
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }

      // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
      return res.redirect('/welcome');
    })
  },
  login: function(req,res){

    User.findOne({
      email:req.param('email'),
      password:req.param('password')
    })
    .exec(function(err, user){
      if(err) {
        return res.negotiate(err);
      }
      if(!user){
        if(req.wantsJSON){
          return res.badRequest('invalid Username/Password')
        }
        return res.redirect('/login')
      }
      // if everything goes fine
      req.session.me = user.id
      if(req.wantsJSON){
        return res.ok();
      }
      return res.redirect('/')
    })
  },
  logout : function(req,res){

    req.session.me = null;

    if(req.wantsJSON){
      return res.ok();
    }
    return res.redirect('/');
  }
};
