chrome.runtime.onMessage.addListener(function (
  { message, customCode, query },
  sender
) {
  if (message == "EXECUTE_SCRIPT_BAG") {
    const options = JSON.parse(query);
    const environment = Object.keys(options).reduce((environment, name) => {
      const env = options[name];

      return { ...environment, [name]: env.value || env.defaultValue };
    }, {});

    const scope = { window, contentSnackBarAPI, environment };

    try {
      (function webBot(code) {
        eval(code);
      }.call(scope, customCode));
    } catch ({ stack, message }) {
      const stackFirstPart = stack.split("\n")[0];

      contentSnackBarAPI.setMessage(stackFirstPart, message, "error");
    }
  }
});

(function setUpKeyForTerminal() {
  let keysPressing = [];
  let terminalCreated = {};

  window.addEventListener("keydown", ({ key }) => {
    keysPressing = keysPressing.includes(key)
      ? keysPressing
      : [...keysPressing, key.toLowerCase()];

    keysPressingString = keysPressing.join("+");

    if (keysPressingString === "alt+t") {
      const hasTerminalCreated = Object.keys(terminalCreated).length;

      if (hasTerminalCreated) {
        terminalCreated.removeTerminal();
      } else {
        terminalCreated = terminal.create();
      }
    }
  });

  window.addEventListener("keyup", ({ key }) => {
    keysPressing = keysPressing.filter((keyPressing) => key !== keyPressing);
  });
})();
