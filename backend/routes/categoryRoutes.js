import express from "express";
const router = express.Router();
import {
  getCategories,
  getCategoryById,
  addCategory,
  addSubcategory,
  editProblem,
  deleteCategory,
  deleteSubcategory,
  addProblem,
  deleteProblem,
  editNote,
} from "../controllers/categoryController.js";

router.route("/:user").get(getCategories).post(addCategory);

router
  .route("/:user/:id")
  .get(getCategoryById)
  .post(addSubcategory)
  .delete(deleteCategory);

router
  .route("/:user/:id/:subcategoryId")
  .delete(deleteSubcategory)
  .post(addProblem);

router
  .route("/:user/:id/:subcategoryId/:problemId")
  .put(editProblem)
  .delete(deleteProblem);

router.route("/:user/:id/:subcategoryId/:problemId/:noteId").put(editNote);

export default router;
