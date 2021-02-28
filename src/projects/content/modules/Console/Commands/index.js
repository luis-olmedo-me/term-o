import { domGet } from "./dom-get.command";
import { css } from "./css.command";

const commands = {
  ...domGet,
  ...css,
};

const keywords = Object.keys(commands);

export { commands, keywords };
