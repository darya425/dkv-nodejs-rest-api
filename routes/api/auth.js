const express = require("express");

const { controllerWrapper, validation } = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/signin", validation(joiSchema), controllerWrapper(ctrl.signin));

router.get("/signout", controllerWrapper(ctrl.signout));

module.exports = router;
