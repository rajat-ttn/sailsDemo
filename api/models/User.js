/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name : {
      type: 'string'
    },

    email : {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },
    todos:{
      collection:'todo',
      via:'user'
    }
  },

  signup: function(inputs, cb){
    User.create({
      name:inputs.name,
      email:inputs.email,
      password: inputs.password
    })
    .exec(cb);
  }
};

