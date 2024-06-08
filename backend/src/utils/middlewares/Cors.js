const allowlist = [process.env.FRONTEND_URL];

// Handler
const handleCors = (req, callback) => {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

module.exports = {
  allowlist,
  handleCors
};
