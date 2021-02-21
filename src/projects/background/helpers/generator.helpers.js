export const generateNewNameFromScripts = (scripts) => {
  let number = 0;
  let isNameTaken = true;
  let availableName = "";
  const defaultName = "New bot";

  while (isNameTaken) {
    availableName = `${defaultName} ${number}`;

    isNameTaken = scripts.some(({ name }) => name === availableName);

    number++;
  }

  return availableName;
};
