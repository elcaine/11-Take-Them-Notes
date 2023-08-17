// Custom middleware that logs out the type and path of each request to the server
const clog = (req, res, next) => {
  const fgCyan = '\x1b[36m';
  const reg = '\x1b[0m';
  switch (req.method) {
    case 'GET': {
      console.info(`📗 ${fgCyan}${req.method} request to ${req.path}${reg}`);
      break;
    }
    case 'POST': {
      console.info(`📘 ${fgCyan}${req.method} request to ${req.path}${reg}`);
      break;
    }
    default:
      console.log(`📙${fgCyan}${req.method} request to ${req.path}${reg}`);
  }

  next();
};

exports.clog = clog;
