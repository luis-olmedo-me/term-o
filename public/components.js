(function initializeComponents(global) {
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
  const inputText = ({ title, defaultValue, name }) => {
    const inputWrapper = document.createElement("div");
    inputWrapper.className = "";

    const header = document.createElement("h4");
    header.className = "";
    const headerNode = document.createTextNode(title);
    header.appendChild(headerNode);

    const input = document.createElement("input");
    input.value = defaultValue;

    inputWrapper.appendChild(header);
    inputWrapper.appendChild(input);

    return inputWrapper;
  };

  const componentsPrototype = {
    Input: ({ type, ...rest }) => {
      switch (type) {
        case "text":
          return inputText(rest);

        default:
          break;
      }
    },
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
          const allSubOptions = Array.from(
            document.getElementsByClassName("script-sub-options")
          );

          allSubOptions &&
            allSubOptions.forEach((subOption) => {
              subOption.className = "script-sub-options closed";
            });

          subOptions.className = "script-sub-options";

          callback && callback();
        };

        scriptContainer.appendChild(subOptions);
      }

      return scriptContainer;
    },
    SnackBar: () => {
      const snackbar = document.createElement("div");
      snackbar.className = "main-snackbar";

      const snackbarMessage = document.createElement("p");
      snackbarMessage.className = "message";

      snackbar.appendChild(snackbarMessage);

      let messagesCounter = 0;
      let isSnackBarOpen = false;
      const showMessage = (theme, text) => {
        if (!isSnackBarOpen) {
          snackbar.className = `main-snackbar ${theme} open`;
          isSnackBarOpen = true;
          snackbarMessage.innerText = text;
        }

        messagesCounter++;

        setTimeout(() => {
          snackbar.className = `main-snackbar ${theme} open`;

          if (messagesCounter - 1 >= 0) {
            messagesCounter--;
          }

          snackbarMessage.innerText = text;

          if (!messagesCounter) {
            setTimeout(() => {
              snackbar.className = `main-snackbar ${theme}`;
              isSnackBarOpen = false;
            }, 1000);
          }
        }, 1000 * messagesCounter);
      };

      return [snackbar, showMessage];
    },
  };

  global.Components = Object.create(componentsPrototype);
  Object.freeze(global.Components);
})(this);
