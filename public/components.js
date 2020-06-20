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

          subOptions.className = `script-sub-options ${
            isClosed ? "" : "closed"
          }`;

          callback && callback();
        };

        scriptContainer.appendChild(subOptions);
      }

      return scriptContainer;
    },
  };

  global.Components = Object.create(componentsPrototype);
  Object.freeze(global.Components);
})(this);
