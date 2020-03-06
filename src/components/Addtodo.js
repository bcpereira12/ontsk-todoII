import React, { Component } from "react";
import { Consumer } from "./Context";
import axios from "axios";

export default class Addtodo extends Component {
  state = {
    id: "",
    title: "",
    complete: false
  };

  update = e => {
    this.setState({
      title: e.target.value
    });
  };

  add = (dispatch, e) => {
    e.preventDefault();
    const newTodo = this.state;
    axios
      .post("http://localhost:5000/todos", newTodo)
      //.post("/todos", newTodo)
      .then(res => dispatch({ type: "ADD", payload: res.data }))
      .catch(err => console.log(err));
    this.setState({ title: "" });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <form onSubmit={this.add.bind(this, dispatch)}>
              <input
                type="text"
                className="form-control"
                placeholder="Type task here..."
                onChange={this.update}
                value={this.state.title}
              />
              <button className="_button" type="submit">
                <i className="fas fa-plus-square"></i>
              </button>
            </form>
          );
        }}
      </Consumer>
    );
  }
}
