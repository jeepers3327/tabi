import React from "react";
import ReactDOM from "react-dom";

import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
