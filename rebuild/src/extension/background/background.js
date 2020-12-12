import Broker from "../../libs/easy-broker";
import { generateNewNameFromScripts } from "./helpers/generator.helpers";

const broker = new Broker();
let scripts = [];

const updateStoredScripts = (scripts) => {
  chrome.storage.local.set({ scriptsBagKey: JSON.stringify(scripts) });
};

broker.on("get_scripts", () => {
  return { ...successResponse, response: scripts };
});

broker.on("create_script", () => {
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
