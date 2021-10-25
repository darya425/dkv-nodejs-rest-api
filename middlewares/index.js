const controllerWrapper = require("./controllersWrapper");
const validation = require("./validation");
const authenticate = require("./authenticate");
const middlewarUpload = require("./upload");

module.exports = {
  controllerWrapper,
  validation,
  authenticate,
  middlewarUpload,
};
