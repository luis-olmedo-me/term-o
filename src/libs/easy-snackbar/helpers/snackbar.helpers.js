import { SNACKBAR_UPDATE } from "../constants/eventsKeys.constants";

export const setSnackbarMessage = (theme, title, message) => {
  const event = new CustomEvent(SNACKBAR_UPDATE, {
    detail: {
      theme,
      title,
      message,
    },
  });

  dispatchEvent(event);
};
