function generateShortUid(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uid = '';
  for (let i = 0; i < length; i += 1) {
    uid += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uid;
}

module.exports = {
  generateShortUid
};
