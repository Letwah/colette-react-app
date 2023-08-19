import React, { Component } from "react";

import "./styles/app.css";

class App extends Component {
  state = {
    todos: [
      { name: "water plants", done: false },
      { name: "walk dog", done: true },
      { name: "paperwork", done: false },
    ],
    error: false,
    congratulationsMsg: false,
  };

  onInput = (e) => {
    this.setState({ input: e.target.value });
  };

  onClick = () => {
    // Defensive check
    let { input, todos } = this.state;

    if (
      !input ||
      input.length < 4 ||
      todos.some((todo) => todo.name === input)
    ) {
      this.setState({ error: true });
      return; // You already added this or input is invalid
    }

    todos = [...this.state.todos, { name: this.state.input, done: false }];
    this.setState({ todos, error: false, congratulationsMsg: false }); // Reset congratulationsMsg
  };

  //listen for which one has been clicked - deligated listener

  onDoneToggle = (name) => {
    const todos = [...this.state.todos];

    const indexOf = todos.findIndex((todo) => {
      return todo.name === name;
    });

    todos[indexOf].done = !todos[indexOf].done;
    this.setState({ todos });
    if (todos.every((todo) => todo.done)) {
      this.setState({
        congratulationsMsg: true,
      });
    } else {
      this.setState({
        congratulationsMsg: false,
      });
    }
  };

  render() {
    //destructure the state

    const { todos, error, congratulationsMsg } = this.state;

    return (
      <>
        <div className="container">
          <div className="typewriterWrapper">
            <div className="typewriterText">
              <h1 className=" typewriter-text title">
                TODO's &#128466; &#9749;
              </h1>
            </div>
          </div>
          <div className="listContent">
            <div className="addItem">
              <input type="text" onInput={this.onInput}></input>
              <p>{error && "Invalid input"}</p>
              <button onClick={this.onClick}>Add</button>
            </div>
            <div className="listItems">
              <ul>
                {todos.map((todo, indexOf, array) => (
                  <li
                    key={todo.name}
                    onClick={() => this.onDoneToggle(todo.name)}
                    className={todo.done ? "done" : "undone"}
                  >
                    {todo.name}
                  </li>
                ))}
              </ul>
              <p>{congratulationsMsg && "Nice One - You've done everything"}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
