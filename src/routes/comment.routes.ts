import { Router } from "express";
import { CommentController } from "../controllers/CommentController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const controller = new CommentController();

// 🔹 LISTAR comentários de um post
router.get("/:postId", controller.listByPost);

// 🔹 CRIAR comentário em um post (PRECISA ESTAR LOGADO)
router.post("/:postId", authMiddleware, controller.create);

export default router;
