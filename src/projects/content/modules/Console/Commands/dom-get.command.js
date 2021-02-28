import { tryCatch } from "./helpers/prevention.helpers";
import { historyTypes } from "../components/HistoryInterpreter/HistoryInterpreter.constants";

const callback = (searches) => {
  let elementsReached = "";

  if (searches) {
    const elementsFound = searches.reduce((found, search) => {
      const elementsFoundByQuery = tryCatch(() =>
        document.querySelectorAll(search)
      );

      return elementsFoundByQuery
        ? [...found, ...Array.from(elementsFoundByQuery)]
        : found;
    }, []);

    elementsReached = elementsFound.reduce((reached, elementFound) => {
      const tagName = elementFound.tagName;
      const id = elementFound.id ? `#${elementFound.id}` : "";
      const className = elementFound.className
        ? `.${elementFound.className}`
        : "";

      const label = `${tagName}${id || className}`;

      return [
        ...reached,
        { label, value: elementFound, type: historyTypes.ELEMENT },
      ];
    }, []);
  }

  return elementsReached?.length
    ? elementsReached
    : [{ label: "Error: DOM elements not Found", type: historyTypes.PLAIN }];
};

export const domGet = {
  "dom-get": {
    callback,
  },
};
