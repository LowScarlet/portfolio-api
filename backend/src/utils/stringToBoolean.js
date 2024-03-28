function stringToBoolean(s) {
  if (!s) {
    return null;
  }

  s = s.toLowerCase();

  if (s === 'true') {
    return true;
  } if (s === 'false') {
    return false;
  }
  return null;
}

module.exports = stringToBoolean;
