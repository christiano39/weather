export const k_to_f = (temp) => {
  return Math.round((temp - 273.15) * (9 / 5) + 32);
};

export const k_to_c = (temp) => {
  return Math.round(temp - 273.15);
};

export const mpsToMph = (speed) => {
  return Math.round(speed * 2.237);
};
