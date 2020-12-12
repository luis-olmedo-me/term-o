import Broker from "../../libs/easy-broker";
import { generateNewNameFromScripts } from "./helpers/generator.helpers";
import { scriptEvents } from "./constants/events.constants";

const broker = new Broker();
let scripts = [];

const updateStoredScripts = (scripts) => {
  chrome.storage.local.set({ scriptsBagKey: JSON.stringify(scripts) });
};

broker.on(scriptEvents.GET_SCRIPTS, () => {
  return { ...successResponse, response: scripts };
});

broker.on(scriptEvents.CREATE_SCRIPT, () => {
  const availableName = generateNewNameFromScripts(scripts);
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

broker.on(scriptEvents.UPDATE_SCRIPT, ({ request: { data } }) => {
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

broker.on(scriptEvents.DELETE_SCRIPT, ({ request: { data } }) => {
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
