const express = require("express");
const router = express.Router();

const { controllerWrapper, validation } = require("../../middlewares");
const { productSchema } = require("../../schemas");

const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
} = require("../../controllers");

router.get("/", controllerWrapper(getAll));

router.get("/:contactId", controllerWrapper(getById));

router.post("/", validation(productSchema), controllerWrapper(add));

router.patch(
  "/:contactId",
  validation(productSchema),
  controllerWrapper(updateById)
);

router.delete("/:contactId", controllerWrapper(deleteById));

module.exports = router;
