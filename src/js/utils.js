export function getCurrentYear() {
  const today = new Date();
  return today.getFullYear();
}

export function getCurrentMonth() {
  const today = new Date();
  return today.getMonth() + 1;
}
