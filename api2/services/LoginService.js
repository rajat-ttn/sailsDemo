/**
 * Created by ttn on 12/06/17.
 */

module.exports = {

  login:function(inputs, cb){
    User.findOne({
      email:inputs.email,
      password:inputs.password
    }).exec()
  }
}
