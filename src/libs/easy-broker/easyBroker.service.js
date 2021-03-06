import { REQUEST_EVENT_KEY } from "./constants/eventKeys.constants";

class Broker {
  constructor() {
    this.keysListening = [];

    this.init();
  }

  init() {
    const receiveEvent = (request, sender, sendResponse) => {
      const key = request[REQUEST_EVENT_KEY];

      if (key) {
        this.matchKey(key, sendResponse, {
          request,
          sender,
        });
      }

      return true;
    };

    chrome.runtime?.onMessage?.addListener(receiveEvent);
    chrome.extension?.onRequest?.addListener(receiveEvent);
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

  send(key, data, callback, tabId) {
    if (key) {
      const requestData = {
        [REQUEST_EVENT_KEY]: key,
        data,
      };

      if (typeof tabId === "number") {
        chrome.tabs.sendRequest(
          tabId,
          requestData,
          (response) => callback && callback(response)
        );
      } else {
        chrome.runtime.sendMessage(
          requestData,
          (response) => callback && callback(response)
        );
      }
    }
  }
}

export const broker = new Broker();
