import React from "react";
import Header from "./Header";
import Addtodo from "./Addtodo";
import Todos from "./Todos";
import { Provider } from "./Context";

function App() {
  return (
    <Provider>
      <div className="app-container">
        <Header></Header>
        <Addtodo></Addtodo>
        <Todos></Todos>
      </div>
    </Provider>
  );
}

export default App;
