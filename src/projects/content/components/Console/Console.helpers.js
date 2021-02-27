export const getLabelsFromHistories = (histories) => {
  return histories.map((history) => {
    return history.map(({ label }) => label);
  });
};
