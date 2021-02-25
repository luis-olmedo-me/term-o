import { domGet } from "./dom-get.command";
import { css } from "./css.command";

export const commands = {
  ...domGet,
  ...css,
};
