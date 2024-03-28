function queryInclude(query) {
  const result = {};
  Object.keys(query).forEach((key) => {
    result[key] = query[key].toLowerCase() === 'true';
  });
  return result;
}

module.exports = { queryInclude };
