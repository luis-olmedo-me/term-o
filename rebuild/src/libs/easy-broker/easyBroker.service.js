import { REQUEST_EVENT_KEY } from "./constants/eventKeys.constants";

class Broker {
  constructor() {
    this.keysListening = [];

    this.init();
  }

  init() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request[this.requestKey]) {
        this.matchKey(REQUEST_EVENT_KEY, sendResponse, {
          request,
          sender,
        });
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

      if (data) {
        sendResponse(data);
      }
    });
  }

  send(key, data, callback) {
    if (key) {
      const requestData = {
        [REQUEST_EVENT_KEY]: key,
        data,
      };

      chrome.runtime.sendMessage(
        requestData,
        (response) => callback && callback(response)
      );
    }
  }
}

export const broker = new Broker();
