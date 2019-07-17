const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const applyMiddleware = app => {
  app.use(helmet());

  app.use(cookieParser());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());
};

module.exports = applyMiddleware;
