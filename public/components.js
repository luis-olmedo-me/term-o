(function initializeComponents(global) {
  const snackbarButton = document.getElementById("snackbar-button");
  const snackbar = document.getElementById("snackbar");
  snackbarButton &&
    (snackbarButton.onclick = () => (snackbar.className = "main-snackbar"));

  const ScriptSubOption = ({ options }) => {
    const scriptContainer = document.createElement("div");
    scriptContainer.classList = ["script-sub-options closed"];

    options.forEach(({ text, callback }) => {
      const scriptButton = document.createElement("button");
      scriptButton.onclick = callback;

      const textNode = document.createTextNode(text);
      scriptButton.appendChild(textNode);

      scriptContainer.appendChild(scriptButton);
    });

    return scriptContainer;
  };

  const componentsPrototype = {
    Script: ({ text = "script", callback, options }) => {
      const hasOptions = Boolean(options);

      const scriptContainer = document.createElement("div");
      scriptContainer.classList = ["script-option"];

      const scriptButton = document.createElement("button");
      scriptButton.onclick = callback;

      const textNode = document.createTextNode(text);
      scriptButton.appendChild(textNode);

      scriptContainer.appendChild(scriptButton);

      if (hasOptions) {
        const subOptions = ScriptSubOption({ options });

        scriptButton.onclick = () => {
          const isClosed = subOptions.className.includes("closed");
          const allSubOptions = Array.from(
            document.getElementsByClassName("script-sub-options")
          );

          allSubOptions &&
            allSubOptions.forEach((subOption) => {
              subOption.className = "script-sub-options closed";
            });

          subOptions.className = `script-sub-options ${
            isClosed ? "" : "closed"
          }`;

          callback && callback();
        };

        scriptContainer.appendChild(subOptions);
      }

      return scriptContainer;
    },
    ErrorAlert: (text) => {
      const snackbar = document.getElementById("main-snackbar");
      const snackbarText = document.getElementById("snackbar-message");

      snackbar.className = "main-snackbar open";
      snackbarText.innerHTML = text;
    },
  };

  global.Components = Object.create(componentsPrototype);
  Object.freeze(global.Components);
})(this);
