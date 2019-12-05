import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
  state = {
    todos: todosList
  };
  handleCreateTodo = (event) => {
    if (event.key === "Enter"){
      const newTodo = {
        "userId": 1,
        "id": Math.random( ) * 100000,
        "title": event.target.value,
        "completed": false
      };
      const newTodoList = this.state.todos.slice();
      newTodoList.push(newTodo);
      this.setState({ todos: newTodoList })
      event.target.value = "";
    }
  };
  handleCompleteTd1= (event, todoIdMarker) => {
    const newMarker = this.state.todos.map(todo => {
      if (todo.id === todoIdMarker) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState ({ todos: newMarker });
  };
  handleVanish = (event, todoRemove) => {
    const newRemove = this.state.todos.filter(todo => {
      if(todo.id === todoRemove) {
        return false;
      }
      return true;
    });
    this.setState({ todos: newRemove });
  };

  handleCompletedDelvric = event => {
    const newTodoList = this.state.todos.filter(todo => {
      if(todo.completed === true) {
        return false;
      }
      return true;
    });
    this.setState({ todos: newTodoList });
  };
  
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autofocus
            onKeyDown ={this.handleCreateTodo}
          />
        </header>
        <TodoList todos={this.state.todos} 
        handleCompleteTd1= {this.handleCompleteTd1}
        handleVanish= {this.handleVanish}/>
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button className="clear-completed" onClick={this.handleCompletedDelvric}>Clear completed</button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onClick = {this.props.handleCompleteTd1}
          />
          <label>{this.props.title}</label>
          <button className="destroy" onClick={this.props.handleVanish} />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem title={todo.title} completed={todo.completed} 
            handleCompleteTd1 = { event => this.props.handleCompleteTd1(event, todo.id)}
            handleVanish = {event => this.props.handleVanish(event, todo.id)}/>
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
