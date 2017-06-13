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
    Todo.find({}, function(err,todoItems){
      return res.view('todoList',{todos:todoItems});
      //return res.json(todoItems);
    })
  }
};
