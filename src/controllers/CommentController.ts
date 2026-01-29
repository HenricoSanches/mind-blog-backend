import { Request, Response } from "express";
import { pool } from "../config/database";

export class CommentController {
  // 🔹 LISTAR COMENTÁRIOS DE UM POST
  async listByPost(req: Request, res: Response) {
    const { postId } = req.params;

    const [comments] = await pool.execute(
      `
      SELECT 
        c.id,
        c.content,
        c.created_at,
        u.name AS user_name,
        u.avatar AS user_avatar
      FROM comments c
      JOIN users u ON u.id = c.user_id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC
      `,
      [postId]
    );

    return res.json(comments);
  }

  // 🔹 CRIAR COMENTÁRIO
  async create(req: Request, res: Response) {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Comentário obrigatório" });
    }

    await pool.execute(
      `INSERT INTO comments (content, post_id, user_id)
       VALUES (?, ?, ?)`,
      [content, postId, req.userId]
    );

    return res.status(201).json({ message: "Comentário criado" });
  }
}
