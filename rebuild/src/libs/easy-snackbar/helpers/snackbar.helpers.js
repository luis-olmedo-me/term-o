import { SNACKBAR_UPDATE } from "../constants/eventsKeys.constants";

export const setSnackbarMessage = (theme, title, message) => {
  const event = CustomEvent(SNACKBAR_UPDATE, {
    detail: {
      theme,
      title,
      message,
    },
  });

  dispatchEvent(event);
};
