import { Request, Response } from "express";
import { pool } from "../config/database";

export class UserController {
  async me(req: Request, res: Response) {
    try {
      const [rows]: any = await pool.execute(
        "SELECT id, name, email, created_at, avatar FROM users WHERE id = ?",
        [req.userId]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.json(rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const avatar = req.file?.filename;

      if (!name || !email) {
        return res.status(400).json({
          message: "Nome e email são obrigatórios",
        });
      }

      if (avatar) {
        await pool.execute(
          "UPDATE users SET name = ?, email = ?, avatar = ? WHERE id = ?",
          [name, email, avatar, req.userId]
        );
      } else {
        await pool.execute(
          "UPDATE users SET name = ?, email = ? WHERE id = ?",
          [name, email, req.userId]
        );
      }

      const [rows]: any = await pool.execute(
        "SELECT id, name, email, created_at, avatar FROM users WHERE id = ?",
        [req.userId]
      );

      return res.json(rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar perfil" });
    }
  }
}
