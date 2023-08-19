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
    showCongratulationsImage: false,
  };

  onInput = (e) => {
    this.setState({ input: e.target.value });
  };

  onClick = () => {
    //defensive check
    let { input, todos } = this.state;

    if (!input || input.length < 4 || todos.includes(input)) {
      this.setState({ error: true });
      return; //you already added this
    }
    todos = [...this.state.todos, { name: this.state.input, done: false }];
    this.setState({ todos, error: false });
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
        showCongratulationsImage: true,
      });
    } else {
      this.setState({
        congratulationsMsg: false,
        showCongratulationsImage: false,
      });
    }
  };

  render() {
    //destructure the state

    const { todos, error, congratulationsMsg, showCongratulationsImage } =
      this.state;

    return (
      <>
        <div
          className={`container ${
            showCongratulationsImage ? "congratulations-active" : ""
          }`}
        >
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
              {showCongratulationsImage && (
                <div className="congratsIFrame">
                  <iframe
                    src="https://giphy.com/embed/ely3apij36BJhoZ234"
                    width="480"
                    height="480"
                    frameBorder="0"
                    class="giphy-embed"
                    allowFullScreen
                  ></iframe>
                  <p>
                    <a href="https://giphy.com/gifs/good-job-congratulations-otter-ely3apij36BJhoZ234">
                      via GIPHY
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
