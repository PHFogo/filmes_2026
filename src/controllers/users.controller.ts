import { Request, Response } from "express";
import User from "../models/User";

class UsersController {
  static async findAll(req: Request, res: Response) {
    const users = await User.findAll();

    res.send(users);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findByPk(Number(id));
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).json({ message: 'Usuário não encontrado!' });
    }

  }

  static async create(req: Request, res: Response) {
    const { name, email, lastName } = req.body;

    if (email && email != '') {
        const savedUser = await User.findOne({ where: {email: email} });
        if (savedUser) {
            return res.status(400).json({ message: 'Usuário já existe com esse email!' });
        }
    } else {
        return res.status(400).json({ message: 'Email é obrigatório!' });
    }

    if (!lastName || lastName == '') {
        return res.status(400).json({ message: 'Sobrenome é obrigatório!' });
    }

    const user = await User.create({ name: name, email: email, lastName });
    return res.status(200).send(user);
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findByPk(Number(id));
    if (user) {
      user?.destroy();
    } else {
      res.status(404).json({ messsage: "Usuário não encontrado" });
    }

    res.status(204).send();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, lastName } = req.body;

    const user = await User.findByPk(Number(id));
    if (user) {
      await user.update({
        name: name,
        email: email,
        lastName
      });

      res.status(200).send(user);
    } else {
      res.status(404).json({ messsage: "Usuário não encontrado" });
    }
  }
}

export default UsersController;
