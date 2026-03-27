import { Request, Response } from "express";
import Agendamento from "../models/Agendamento";
import Aula from "../models/Aula";
import User from "../models/User";

class AgendamentosController {
  static async findAll(req: Request, res: Response) {
    const agendamentos = await Agendamento.findAll({
      include: [
        { model: User, as: "aluno", attributes: ["id", "name", "email"] },
        {
          model: Aula, as: "aula",
          include: [{ model: User, as: "professor", attributes: ["id", "name", "email"] }],
        },
      ],
    });
    res.status(200).json(agendamentos);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const agendamento = await Agendamento.findByPk(Number(id), {
      include: [
        { model: User, as: "aluno", attributes: ["id", "name", "email"] },
        {
          model: Aula, as: "aula",
          include: [{ model: User, as: "professor", attributes: ["id", "name", "email"] }],
        },
      ],
    });
    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }
    return res.status(200).json(agendamento);
  }

  static async create(req: Request, res: Response) {
    const { alunoId, aulaId, data } = req.body;

    if (!alunoId) {
      return res.status(400).json({ message: "Aluno é obrigatório!" });
    }
    if (!aulaId) {
      return res.status(400).json({ message: "Aula é obrigatória!" });
    }
    if (!data) {
      return res.status(400).json({ message: "Data é obrigatória!" });
    }

    const aluno = await User.findByPk(Number(alunoId));
    if (!aluno || aluno.tipo !== "aluno") {
      return res.status(400).json({ message: "Aluno inválido!" });
    }

    const aula = await Aula.findByPk(Number(aulaId));
    if (!aula) {
      return res.status(404).json({ message: "Aula não encontrada!" });
    }

    const agendamento = await Agendamento.create({ alunoId, aulaId, data });
    return res.status(201).json(agendamento);
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    const agendamento = await Agendamento.findByPk(Number(id));
    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não encontrado" });
    }
    await agendamento.destroy();
    return res.status(204).send();
  }
}

export default AgendamentosController;
