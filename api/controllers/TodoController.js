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

  addTodoX: function (req, res) {
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
  },


  ///////////////
  getTodos: function(req, res) {
    TodoService.getTodos(function(todos) {
      res.json(todos);
    });
  },
  addTodo: function(req, res) {
    var todoVal = (req.body.msg) ? req.body.msg : undefined
    TodoService.addTodo(todoVal, function(success) {
      res.json(success);
    });
  },
  removeTodo: function(req, res) {
    var todoVal = (req.body.msg) ? req.body.msg : undefined
    TodoService.removeTodo(todoVal, function(success) {
      res.json(success);
    });
  }

};

