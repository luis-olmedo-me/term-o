// chrome.tabs.create({ url: "./public/main.html" });

// const value = [
//   { name: "My great script", script: "console.log('hola')" },
//   { name: "My best script", script: "console.log('carola')" },
// ];
// chrome.storage.local.set({ scriptsBagKey: JSON.stringify(value) }, function () {
//   console.log("Value is set to" + value);
// });

class Broker {
  constructor() {
    this.keysListening = [];
    this.requestKey = "WEB_BOTS_REQUEST";

    this.init();
  }

  init() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request[this.requestKey]) {
        this.matchKey(request.WEB_BOTS_REQUEST, sendResponse, sender);
      }
    });
  }

  on(keyMatch, callback) {
    this.keysListening = [...this.keysListening, { keyMatch, callback }];
  }

  matchKey(key, sendResponse, sender) {
    const matches = this.keysListening.filter(
      ({ keyMatch }) => keyMatch === key
    );

    matches.forEach(({ callback }) => {
      const data = callback(sender);

      console.log(data);
      if (data) {
        sendResponse(data);
      }
    });
  }
}

(function manageScripts() {
  let queries = [];

  const broker = new Broker();

  broker.on("get_queries", () => {
    return { response: queries };
  });
})();
