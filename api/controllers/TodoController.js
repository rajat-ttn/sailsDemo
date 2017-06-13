/**
 * TodoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `TodoController.msg()`
   */
  listAll: function (req, res) {
    Todo.find({user:req.session.me}, function(err,todoItems){
      return res.view('todoList',{todos:todoItems});
      //return res.json(todoItems);
    })
  },

  addTodo: function (req, res) {
    if(req.isSocket){
      console.log('make socket listen to todo events' + req.socket.id);
      return Todo.watch(req.socket);
    }
    Todo.create({
      msg:req.param('todo'),
      user:req.session.me
    }, function(err, item){

      Todo.publishCreate(item);

      res.redirect('/');
    })
  }
};



function a(req,res) {

  var data_from_client = req.params.all();

  if(req.isSocket && req.method === 'POST'){

// This is the message from connected client
// So add new conversation
    Chat.create(data_from_client)
      .exec(function(error,data_from_client){
        console.log(data_from_client);
        Chat.publishCreate({id: data_from_client.id, message : data_from_client.message , user:data_from_client.user});
      });
  }
  else if(req.isSocket){
    Chat.watch(req.socket);
    console.log( 'User subscribed to ' + req.socket.id );
  }
}
