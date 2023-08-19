import React, { Component } from "react";
import { gsap } from "gsap";

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
      return; // input is invalid
    }

    todos = [...this.state.todos, { name: this.state.input, done: false }];
    this.setState({ todos, error: false, congratulationsMsg: false }); // Reset
  };

  //listen for which one has been clicked

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

  componentDidMount() {
    const { congratulationsMsg } = this.state;
    if (congratulationsMsg) {
      gsap.fromTo(
        this.congratsMsgRef,
        { x: slideDistance, opacity: 0 },
        { x: 0, opacity: 1, duration: animationDuration, ease: "power2.out" }
      );
    }
  }

  render() {
    //destructure the state

    const { todos, error, congratulationsMsg } = this.state;

    let congratsMsgRef = null;

    // GSAP Animation settings
    const animationDuration = 1; // in seconds
    const slideDistance = 100; // in pixels

    if (congratulationsMsg) {
      // bring essage in from side
      gsap.fromTo(
        congratsMsgRef,
        { x: slideDistance, opacity: 0 },
        { x: 0, opacity: 1, duration: animationDuration, ease: "power2.out" }
      );
    }

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

              <p
                ref={(element) => (this.congratsMsgRef = element)}
                className={
                  congratulationsMsg
                    ? "showCongratulations"
                    : "hideCongratulations"
                }
              >
                {congratulationsMsg &&
                  "Nice One - You've done everything! 🙌 🥳 ⚡️"}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
