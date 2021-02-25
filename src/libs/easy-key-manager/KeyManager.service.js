import { NEW_COMMAND } from "./KeysManager.constants";

class KeysManager {
  constructor() {
    this.connectionProvider = {};
    this.callbacks = [];
  }

  init() {
    this.connectionProvider.on(NEW_COMMAND, ({ request: { data } }) => {
      this.callbacks.forEach((callback) => callback(data?.command));
    });
  }

  setConnectionProvider(connectionProvider) {
    this.connectionProvider = connectionProvider;

    return this;
  }

  onNewCommand(callback) {
    this.callbacks = [...this.callbacks, callback];
  }
}

export const keysManager = new KeysManager();
