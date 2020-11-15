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
  const backgroundRequest = (key, data, callback) => {
    if (key) {
      const requestData = {
        WEB_BOTS_REQUEST: key,
        data,
      };

      chrome.runtime.sendMessage(
        requestData,
        (response) => callback && callback(response)
      );
    }
  };
  let scripts = [];

  backgroundRequest("get_scripts", null, ({ response: scriptsResponse }) => {
    scripts = scriptsResponse;
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
        const keyFormatted = key.toLowerCase();

        this.keysPressing = this.keysPressing.filter(
          (keyPressing) => keyFormatted !== keyPressing
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

  let terminalCreated = {};

  keyManager = new KeysManager();

  const deleteTerminal = () => {
    const hasTerminalCreated = Object.keys(terminalCreated).length;

    if (hasTerminalCreated) {
      terminalCreated.removeTerminal();

      terminalCreated = {};
    }
  };

  keyManager.on("alt+t", () => {
    const hasTerminalCreated = Object.keys(terminalCreated).length;

    if (hasTerminalCreated) {
      deleteTerminal();
    } else {
      terminalCreated = terminal.create(scripts);
    }
  });

  keyManager.on("escape", deleteTerminal);
})();
