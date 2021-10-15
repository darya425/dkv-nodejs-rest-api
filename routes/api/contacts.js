const express = require("express");
const router = express.Router();

const { controllerWrapper, validation } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");

const { contact: ctrl } = require("../../controllers");

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(joiSchema), controllerWrapper(ctrl.add));

router.patch(
  "/:contactId/favorite",
  validation(joiSchema),
  controllerWrapper(ctrl.updateById)
);

router.delete("/:contactId", controllerWrapper(ctrl.deleteById));

module.exports = router;
