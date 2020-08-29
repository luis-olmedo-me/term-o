(function initializeSnackbarAPI(global) {
  if (global.contentSnackBarAPI) {
    throw new Error("Web Bots duplicated data found");
  }

  const page = document.getElementsByTagName("body")[0];

  const webBotsContents = document.createElement("div");
  const webBotsContentsStyle = webBotsContents.style;

  webBotsContents.id = "web-bots-contents";
  webBotsContentsStyle.width = "100vw";
  webBotsContentsStyle.height = "100vh";
  webBotsContentsStyle.position = "absolute";
  webBotsContentsStyle.zIndex = 10000000;
  webBotsContentsStyle.top = 0;
  webBotsContentsStyle.pointerEvents = "none";

  page.insertBefore(webBotsContents, page.firstChild);

  const createSnackbar = ({ newTitle, newMessage, theme }) => {
    const snackBarWrapper = document.createElement("div");
    const snackBarWrapperStyle = snackBarWrapper.style;

    snackBarWrapperStyle.color = "#fff";
    snackBarWrapperStyle.backgroundColor = theme;
    snackBarWrapperStyle.position = "absolute";
    snackBarWrapperStyle.width = "max-content";
    snackBarWrapperStyle.padding = "10px 50px 10px 20px";
    snackBarWrapperStyle.borderRadius = "0 5px 5px 0";
    snackBarWrapperStyle.top = "50px";
    snackBarWrapperStyle.boxShadow = "0px 0px 8px 1px #d6d6d6";

    const titleText = document.createTextNode(newTitle);
    const messageText = document.createTextNode(newMessage);
    const title = document.createElement("span");
    const message = document.createElement("p");

    const titleStyle = title.style;
    const messageStyle = message.style;

    titleStyle.fontSize = 18;
    titleStyle.fontWeight = "bold";

    messageStyle.margin = 0;

    title.appendChild(titleText);
    message.appendChild(messageText);

    snackBarWrapper.appendChild(title);
    snackBarWrapper.appendChild(message);

    return snackBarWrapper;
  };

  const COLORS = {
    success: "#619c61",
    error: "#ff212c",
  };

  const $webBots = $("#web-bots-contents");

  global.contentSnackBarAPI = {
    setMessage: (title, message, theme) => {
      const snackbar = createSnackbar({
        theme: COLORS[theme] || COLORS.error,
        newTitle: title,
        newMessage: message,
      });

      webBotsContents.appendChild(snackbar);

      window.addEventListener("scroll", (event) => {
        $webBots.css("top", scrollY);
      });

      setTimeout(() => snackbar.remove(), 5000);
    },
  };

  Object.freeze(global.contentSnackBarAPI);
})(this);
