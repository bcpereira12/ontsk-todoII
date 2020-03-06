import React, { Component } from "react";
import { Consumer } from "./Context";
import axios from "axios";

export default class Todo extends Component {
  style = () => {
    const { complete } = this.props.todo;
    return { textDecoration: complete ? "line-through" : "none" };
  };

  checkoff = (id, dispatch) => {
    dispatch({ type: "CHECKOFF", payload: id });
  };

  remove = (id, dispatch) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      //.delete(`/todos/${id}`)
      .then(() => dispatch({ type: "REMOVE", payload: id }));
  };

  render() {
    const { title, _id } = this.props.todo;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <h3 className="todo-item" style={this.style()}>
              <i
                className="todo-item__icon far fa-times-circle"
                onClick={this.remove.bind(this, _id, dispatch)}
              ></i>
              {title}
              <input
                type="checkbox"
                className="checkbox__icon"
                onChange={this.checkoff.bind(this, _id, dispatch)}
              />
            </h3>
          );
        }}
      </Consumer>
    );
  }
}
