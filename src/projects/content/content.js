import React from "react";
import ReactDOM from "react-dom";

import { scriptEvents } from "../../constants/events.constants";
import { executeCode } from "../../helpers/execution.helper";
import { Content } from "./components/Content/Content.component";

chrome.runtime.onMessage.addListener(function ({ message, customCode, query }) {
  if (message == scriptEvents.EXECUTE_SCRIPT) {
    const options = JSON.parse(query);
    const environment = Object.keys(options).reduce((environment, name) => {
      const env = options[name];

      return { ...environment, [name]: env.value || env.defaultValue };
    }, {});

    const scope = { window, contentSnackBarAPI, environment };

    executeCode(customCode, scope, ({ stack, message }) => {
      const stackFirstPart = stack.split("\n")[0];

      // FIXME: Add snackbar API
      // contentSnackBarAPI.setMessage(stackFirstPart, message, "error");
    });
  }
});

const body = document.getElementsByTagName("body")[0];
const rootDiv = document.createElement("div");

body.prepend(rootDiv);

ReactDOM.render(
  <React.StrictMode>
    <Content />
  </React.StrictMode>,
  rootDiv
);
