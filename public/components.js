(function initializeComponents(global) {
  const ScriptSubOption = ({ options }) => {
    const $scriptContainer = $("<div></div>")
      .addClass("script-sub-options")
      .addClass("closed");

    options.forEach(({ text, callback }) => {
      const $scriptButton = $("<button></button>")
        .on("click", callback)
        .text(text);

      $scriptContainer.append($scriptButton);
    });

    return $scriptContainer;
  };
  const inputText = ({ title, defaultValue, name, saveEnvChanges }) => {
    const $header = $("<h3></h3>").addClass("configuration-title").text(title);

    const $input = $("<input></input>")
      .addClass("configuration-input")
      .on("change", () => saveEnvChanges($input.val(), name))
      .val(defaultValue);

    const $inputContainer = $("<div></div>")
      .addClass("configuration-input-container")
      .append($input);

    const $inputWrapper = $("<div></div>")
      .addClass("input-wrapper")
      .append($header)
      .append($inputContainer);

    return $inputWrapper;
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

      const $scriptButton = $("<button></button>")
        .on("click", callback)
        .text(text);

      const $scriptContainer = $("<div></div>")
        .addClass("script-option")
        .append($scriptButton);

      if (hasOptions) {
        const $subOption = ScriptSubOption({ options });

        $scriptButton.on("click", () => {
          const $allSubOptions = $(".script-sub-options");

          $allSubOptions.each(function (index) {
            $allSubOptions.eq(index).addClass("closed");
          });

          $subOption.removeClass("closed");

          callback && callback();
        });

        $scriptContainer.append($subOption);
      }

      return $scriptContainer;
    },
    SnackBar: () => {
      const $snackbarMessage = $("<p></p>").addClass("message");

      const $snackbar = $("<div></div>")
        .addClass("main-snackbar")
        .append($snackbarMessage);

      let messagesCounter = 0;
      let isSnackBarOpen = false;
      const showMessage = (theme, text) => {
        if (!isSnackBarOpen) {
          $snackbar.removeClass(["success", "error"]).addClass([theme, "open"]);
          $snackbarMessage.text(text);

          isSnackBarOpen = true;
        }

        messagesCounter++;

        setTimeout(() => {
          $snackbar.removeClass(["success", "error"]).addClass([theme, "open"]);

          if (messagesCounter - 1 >= 0) {
            messagesCounter--;
          }

          $snackbarMessage.text(text);

          if (!messagesCounter) {
            setTimeout(() => {
              $snackbar
                .removeClass(["success", "error", "open"])
                .addClass(theme);

              isSnackBarOpen = false;
            }, 1000);
          }
        }, 1000 * messagesCounter);
      };

      return [$snackbar, showMessage];
    },
  };

  global.Components = Object.create(componentsPrototype);
  Object.freeze(global.Components);
})(this);
