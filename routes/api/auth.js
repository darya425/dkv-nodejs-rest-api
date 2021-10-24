const express = require("express");

const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.signin));

router.patch(
  "/",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.updateUser)
);

router.get("/current", authenticate, controllerWrapper(ctrl.current));

router.get("/logout", authenticate, controllerWrapper(ctrl.signout));

module.exports = router;
