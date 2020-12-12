import React from "react";
import ReactDOM from "react-dom";

import { scriptEvents } from "../../constants/events.constants";
import { executeCode } from "../../helpers/execution.helper";
import { Snackbar } from "../shared-components/Snackbar/Snackbar.component";

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

rootDiv.setAttribute("id", "easy_console_content");
body.appendChild(rootDiv);

ReactDOM.render(
  <React.StrictMode>
    <Snackbar />
  </React.StrictMode>,
  rootDiv
);
