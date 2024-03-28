function selectedFieldByArray(keys) {
  const result = {};
  keys.forEach((key) => {
    result[key] = true;
  });
  return result;
}

module.exports = selectedFieldByArray;
