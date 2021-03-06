export const range = (minimum, maximum, value) => {
  if (value >= maximum) return maximum;
  else if (value <= minimum) return minimum;
  else return value;
};
