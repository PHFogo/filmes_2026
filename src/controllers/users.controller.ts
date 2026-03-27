import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

class UsersController {
  static async findAll(req: Request, res: Response) {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.send(users);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findByPk(Number(id), { attributes: { exclude: ['password'] } });
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }
  }

  static async create(req: Request, res: Response) {
    const { name, email, password, tipo } = req.body;

    if (!email || email === '') {
      return res.status(400).json({ message: 'Email é obrigatório!' });
    }

    const savedUser = await User.findOne({ where: { email } });
    if (savedUser) {
      return res.status(400).json({ message: 'Usuário já existe com esse email!' });
    }

    if (!password || password === '') {
      return res.status(400).json({ message: 'Senha é obrigatória!' });
    }

    if (!name || name === '') {
      return res.status(400).json({ message: 'Nome é obrigatório!' });
    }

    if (!tipo || !['aluno', 'professor'].includes(tipo)) {
      return res.status(400).json({ message: 'Tipo deve ser "aluno" ou "professor"!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, tipo });
    const { password: _, ...userWithoutPassword } = (user as any).toJSON();
    return res.status(201).json(userWithoutPassword);
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findByPk(Number(id));
    if (user) {
      await user.destroy();
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, tipo } = req.body;

    const user = await User.findByPk(Number(id));
    if (user) {
      await user.update({ name, email, tipo });
      const { password: _, ...userWithoutPassword } = (user as any).toJSON();
      return res.status(200).json(userWithoutPassword);
    } else {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  }
}

export default UsersController;
