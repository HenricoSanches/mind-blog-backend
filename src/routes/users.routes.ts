import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";
import { upload } from "../config/upload";

const router = Router();
const controller = new UserController();

// Buscar usuário logado
router.get("/me", authMiddleware, controller.me);

// Atualizar perfil + avatar
router.put(
  "/me",
  authMiddleware,
  upload.single("avatar"),
  controller.update
);

export default router;
