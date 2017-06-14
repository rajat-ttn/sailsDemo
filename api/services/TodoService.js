module.exports = {
  getTodos: function(next) {
    Todo.find().exec(function(err, todos) {
      if(err) throw err;
      next(todos);
    });
  },
  addTodo: function(todoVal, next) {
    Todo.create({msg: todoVal}).exec(function(err, todo) {
      if(err) throw err;
      next(todo);
    });
  },
  removeTodo: function(todoVal, next) {
    Todo.destroy({msg: todoVal}).exec(function(err, todo) {
      if(err) throw err;
      next(todo);
    });
  }
};