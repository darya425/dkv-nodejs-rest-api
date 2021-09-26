const express = require("express");
const router = express.Router();

const { controllerWrapper, validation } = require("../../middlewares");
const { productSchema } = require("../../schemas");

const { contacts: ctrl } = require("../../controllers");

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(productSchema), controllerWrapper(ctrl.add));

router.patch(
  "/:contactId",
  validation(productSchema),
  controllerWrapper(ctrl.updateById)
);

router.delete("/:contactId", controllerWrapper(ctrl.deleteById));

module.exports = router;
