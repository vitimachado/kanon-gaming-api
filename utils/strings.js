function checkIfStringStartsWith(str, substrs) {
  return substrs.some(substr => str.startsWith(substr));
}

module.exports = {
  checkIfStringStartsWith
};
