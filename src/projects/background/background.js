import broker from "libs/easy-broker";
import { NEW_COMMAND } from "libs/easy-key-manager";

import { SCRIPTS_STORE } from "src/constants/localStorage.constants";
import { scriptEvents } from "src/constants/events.constants";

import { generateNewNameFromScripts } from "./helpers/generator.helpers";

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

chrome.storage.local.get([SCRIPTS_STORE], function (result) {
  const scriptStore = result[SCRIPTS_STORE] || "[]";

  scripts = JSON.parse(scriptStore);
});

chrome.commands.onCommand.addListener(function (command) {
  chrome.tabs.query({ active: true }, ([{ id }]) => {
    broker.send(NEW_COMMAND, { command }, null, id);
  });
});
