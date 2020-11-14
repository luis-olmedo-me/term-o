class Broker {
  constructor() {
    this.keysListening = [];
    this.requestKey = "WEB_BOTS_REQUEST";

    this.init();
  }

  init() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request[this.requestKey]) {
        this.matchKey(request.WEB_BOTS_REQUEST, sendResponse, {
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
}

const getAvailableName = (scripts) => {
  let number = 0;
  let isNumberAvailable = false;
  let availableName = "";
  const defaultName = "New bot";

  while (!isNumberAvailable) {
    availableName = `${defaultName} ${number}`;

    isNumberAvailable = scripts.every(({ name }) => name !== availableName);

    number++;
  }

  return availableName;
};

(function manageScripts() {
  let scripts = [];

  const broker = new Broker();
  const successResponse = { status: "success", response: {} };

  const updateStoredScripts = (scripts) => {
    chrome.storage.local.set({ scriptsBagKey: JSON.stringify(scripts) });
  };

  broker.on("get_scripts", () => {
    return { ...successResponse, response: scripts };
  });

  broker.on("create_script", () => {
    const availableName = getAvailableName(scripts);
    const newScript = {
      name: availableName,
      script: "",
      query: "{}",
      command: availableName.replace(" ", "_"),
    };

    scripts = [...scripts, newScript];

    updateStoredScripts(scripts);

    return { successResponse, response: newScript };
  });

  broker.on("update_script", ({ request: { data } }) => {
    const { oldName, updatedScript } = data;
    const newName = updatedScript.name;

    const isNewNameRepeated = scripts.some(
      ({ name: scriptName }) => scriptName === newName && scriptName !== oldName
    );

    if (isNewNameRepeated) {
      return {
        status: "error",
        message: "name_already_taken",
      };
    }

    scripts = scripts.map((script) =>
      script.name === oldName ? updatedScript : script
    );

    updateStoredScripts(scripts);

    return successResponse;
  });

  broker.on("delete_script", ({ request: { data } }) => {
    const name = data.name;

    scripts = scripts.filter((script) => {
      return script.name !== name;
    });

    updateStoredScripts(scripts);

    return successResponse;
  });

  chrome.storage.local.get(["scriptsBagKey"], function (result) {
    scripts = JSON.parse(result.scriptsBagKey) || [];
  });
})();
