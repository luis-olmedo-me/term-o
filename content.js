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

class KeysManager {
  constructor() {
    this.keysListening = [];
    this.keysPressing = [];

    this.init();
  }

  init() {
    window.addEventListener("keydown", ({ key }) => {
      this.keysPressing = this.keysPressing.includes(key)
        ? this.keysPressing
        : [...this.keysPressing, key.toLowerCase()];

      const keysCombination = this.keysPressing.join("+");

      this.matchKey(keysCombination);
    });

    window.addEventListener("keyup", ({ key }) => {
      this.keysPressing = this.keysPressing.filter(
        (keyPressing) => key !== keyPressing
      );
    });
  }

  matchKey(keyCombination) {
    const matches = this.keysListening.filter(
      ({ keyMatch }) => keyMatch === keyCombination
    );

    matches.forEach(({ callback }) => callback());
  }

  on(keyMatch, callback) {
    this.keysListening = [...this.keysListening, { keyMatch, callback }];
  }
}

(function setUpKeyForTerminal() {
  let terminalCreated = {};

  keyManager = new KeysManager();

  keyManager.on("alt+t", () => {
    const hasTerminalCreated = Object.keys(terminalCreated).length;

    if (hasTerminalCreated) {
      terminalCreated.removeTerminal();
    } else {
      terminalCreated = terminal.create();
    }
  });
})();
