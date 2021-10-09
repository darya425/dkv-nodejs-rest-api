const express = require("express");
const router = express.Router();

const { controllerWrapper, validation } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");

const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
} = require("../../controllers");

router.get("/", controllerWrapper(getAll));

router.get("/:contactId", controllerWrapper(getById));

router.post("/", validation(joiSchema), controllerWrapper(add));

router.patch(
  "/:contactId/favorite",
  validation(joiSchema),
  controllerWrapper(updateById)
);

router.delete("/:contactId", controllerWrapper(deleteById));

module.exports = router;
