(function initializeAPIs(global) {
  if (global.contentSnackBarAPI) {
    throw new Error("Web Bots duplicated data found");
  }

  const $page = $("body");
  const $webBotsContents = $("<div></div>")
    .css("width", "100%")
    .css("height", "100%")
    .css("position", "absolute")
    .css("z-index", 1000000)
    .css("top", 0)
    .css("pointer-events", "none");

  $page.prepend($webBotsContents);

  const createSnackbar = ({ newTitle, newMessage, theme }) => {
    const $title = $("<span></span>")
      .text(newTitle)
      .css("font-size", 18)
      .css("font-weight", "bold");
    const $message = $("<p></p>").text(newMessage).css("margin", 0);

    const $snackBarWrapper = $("<div></div>")
      .css("pointer-events", "auto")
      .css("cursor", "pointer")
      .css("color", "#fff")
      .css("background-color", theme)
      .css("position", "absolute")
      .css("width", "max-content")
      .css("padding", "10px 50px 10px 20px")
      .css("border-radius", "0 5px 5px 0")
      .css("top", scrollY + 75)
      .css("box-shadow", "0px 0px 8px 1px #d6d6d6")
      .on("click", () => $snackBarWrapper.remove())
      .append($title)
      .append($message);

    return $snackBarWrapper;
  };

  const createTerminal = () => {
    const $input = $("<input />")
      .attr("type", "text")
      .addClass("web-bots-terminal-input");

    const $icon = $("<div></div>").addClass("web-bots-terminal-chevron");

    const $terminalWrapper = $("<div></div>")
      .addClass("web-bots-terminal-wrapper")
      .css("top", scrollY)
      .append($icon)
      .append($input);

    return [$terminalWrapper, $input];
  };

  const COLORS = {
    success: "#619c61",
    error: "#ff212c",
  };

  global.contentSnackBarAPI = {
    setMessage: (title, message, theme) => {
      const $snackbar = createSnackbar({
        theme: COLORS[theme] || COLORS.error,
        newTitle: title,
        newMessage: message,
      });

      $webBotsContents.append($snackbar);

      const removeSnackbar = () => {
        $snackbar.remove();

        window.removeEventListener("scroll", scrollEventId);
        window.clearTimeout(timeOutEventId);
      };

      const scrollEventId = window.addEventListener("scroll", removeSnackbar);
      const timeOutEventId = setTimeout(removeSnackbar, 5000);
    },
  };

  global.terminal = {
    create: (scripts = []) => {
      const [$terminal, $terminalInput] = createTerminal();

      $webBotsContents.append($terminal);

      const removeTerminal = () => {
        $terminal.remove();

        window.removeEventListener("scroll", scrollEventId);
      };

      const scrollEventId = window.addEventListener("scroll", removeTerminal);

      const onInputKeyUp = ({ key }) => {
        if (key === "Enter") {
          const commands = $terminalInput.val();
          const terminalArguments = commands.split(" ");

          const scriptMatch = scripts.find(
            ({ command }) => command === terminalArguments[0]
          );

          if (scriptMatch) {
            const query = JSON.parse(scriptMatch.query);

            const environment = Object.keys(query).reduce(
              (environment, name) => {
                const env = query[name];

                return {
                  ...environment,
                  [name]: env.value || env.defaultValue,
                };
              },
              {}
            );

            const scope = {
              window,
              contentSnackBarAPI,
              environment,
              terminalArguments,
            };

            try {
              (function webBot(code) {
                eval(code);
              }.call(scope, scriptMatch.script));
            } catch ({ stack, message }) {
              const stackFirstPart = stack.split("\n")[0];

              contentSnackBarAPI.setMessage(stackFirstPart, message, "error");
            }
          } else {
            contentSnackBarAPI.setMessage(
              "The following command does not exist!",
              `Command: ${command}`,
              "error"
            );
          }

          $terminalInput.val("");
        }
      };

      $terminalInput.on("keyup", onInputKeyUp).focus();

      return { $terminal, removeTerminal };
    },
  };

  Object.freeze(global.contentSnackBarAPI);
  Object.freeze(global.terminal);
})(this);
