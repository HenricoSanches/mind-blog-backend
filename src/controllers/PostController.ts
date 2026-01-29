import { Request, Response } from "express";
import { pool } from "../config/database";

export class PostController {
  async create(req: Request, res: Response) {
    const { title, content } = req.body;
    const banner = req.file?.filename ?? null;

    if (!title || !content) {
      return res.status(400).json({
        message: "Título e conteúdo são obrigatórios",
      });
    }

    await pool.execute(
      `INSERT INTO posts (title, content, banner_image, author_id)
       VALUES (?, ?, ?, ?)`,
      [title, content, banner, req.userId]
    );

    return res.status(201).json({ message: "Post criado" });
  }

  async list(_req: Request, res: Response) {
    const [posts] = await pool.execute(
      `SELECT 
        p.id,
        p.title,
        p.content,
        p.banner_image,
        p.created_at,
        u.name AS author
       FROM posts p
       JOIN users u ON u.id = p.author_id
       ORDER BY p.created_at DESC`
    );

    return res.json(posts);
  }

  // 🔥 MÉTODO QUE FALTAVA (CORREÇÃO DO BUG)
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const [rows]: any = await pool.execute(
      `SELECT 
        p.id,
        p.title,
        p.content,
        p.banner_image,
        p.created_at,
        u.name AS author
       FROM posts p
       JOIN users u ON u.id = p.author_id
       WHERE p.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    return res.json(rows[0]);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;
    const banner = req.file?.filename ?? null;

    if (!title || !content) {
      return res.status(400).json({
        message: "Título e conteúdo são obrigatórios",
      });
    }

    const [rows]: any = await pool.execute(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    if (rows[0].author_id !== req.userId) {
      return res.status(403).json({ message: "Sem permissão" });
    }

    if (banner) {
      await pool.execute(
        "UPDATE posts SET title = ?, content = ?, banner_image = ? WHERE id = ?",
        [title, content, banner, id]
      );
    } else {
      await pool.execute(
        "UPDATE posts SET title = ?, content = ? WHERE id = ?",
        [title, content, id]
      );
    }

    return res.json({ message: "Post atualizado" });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const [rows]: any = await pool.execute(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    if (rows[0].author_id !== req.userId) {
      return res.status(403).json({ message: "Sem permissão" });
    }

    await pool.execute("DELETE FROM posts WHERE id = ?", [id]);

    return res.json({ message: "Post removido" });
  }
}
