alert("Hello from your Chrome extension!");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    console.log("hola");
  }
});
