import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { authMiddleware } from "../middlewares/auth";
import { upload } from "../config/upload";

const router = Router();
const controller = new PostController();

/* 🔹 CRIAR POST */
router.post(
  "/",
  authMiddleware,
  upload.single("banner"),
  controller.create
);

/* 🔹 LISTAR POSTS */
router.get("/", controller.list);

/* 🔹 DETALHE DO POST */
router.get("/:id", controller.show);

/* 🔹 ATUALIZAR POST */
router.put(
  "/:id",
  authMiddleware,
  upload.single("banner"),
  controller.update
);

/* 🔹 EXCLUIR POST */
router.delete(
  "/:id",
  authMiddleware,
  controller.delete
);

export default router;
