const callback = (searches) => {
  let elementsReached = "";

  if (searches) {
    const elementsFound = searches.reduce((found, search) => {
      const elementsFoundByQuery = document.querySelectorAll(search);

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

      return [...reached, { label, value: elementFound }];
    }, []);
  }

  return elementsReached?.length
    ? elementsReached
    : ["Error: DOM elements not Found"];
};

export const domGet = {
  "dom-get": {
    callback,
  },
};
