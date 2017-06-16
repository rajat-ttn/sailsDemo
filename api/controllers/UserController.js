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

      sails.log.info('signing-up' + JSON.stringify(req.session,null,'\t'));

      req.session.me = user.id;
      req.session.userName = user.name;

      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }

      return res.redirect('/');
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
      req.session.userName = user.name;
      if(req.wantsJSON){
        return res.ok();
      }
      return res.redirect('/')
    })
  },
  logout : function(req,res){

    sails.log.info('logging-out' + JSON.stringify(req.session,null,'\t'));

    req.session.me = null;

    if(req.wantsJSON){
      return res.ok();
    }
    return res.redirect('/');
  }
};
