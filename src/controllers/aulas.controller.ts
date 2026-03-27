import { Request, Response } from "express";
import Aula from "../models/Aula";
import User from "../models/User";

class AulasController {
  static async findAll(req: Request, res: Response) {
    const { materia } = req.query;
    const where: any = {};
    if (materia) {
      where.materia = materia;
    }
    const aulas = await Aula.findAll({
      where,
      include: [{ model: User, as: "professor", attributes: ["id", "name", "email"] }],
    });
    res.status(200).json(aulas);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const aula = await Aula.findByPk(Number(id), {
      include: [{ model: User, as: "professor", attributes: ["id", "name", "email"] }],
    });
    if (!aula) {
      return res.status(404).json({ message: "Aula não encontrada" });
    }
    return res.status(200).json(aula);
  }

  static async create(req: Request, res: Response) {
    const { materia, valor, descricao, professorId } = req.body;

    if (!materia || materia === "") {
      return res.status(400).json({ message: "Matéria é obrigatória!" });
    }
    if (valor === undefined || valor === null) {
      return res.status(400).json({ message: "Valor é obrigatório!" });
    }
    if (!professorId) {
      return res.status(400).json({ message: "Professor é obrigatório!" });
    }

    const professor = await User.findByPk(Number(professorId));
    if (!professor || professor.tipo !== "professor") {
      return res.status(400).json({ message: "Professor inválido!" });
    }

    const aula = await Aula.create({ materia, valor, descricao, professorId });
    return res.status(201).json(aula);
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    const aula = await Aula.findByPk(Number(id));
    if (!aula) {
      return res.status(404).json({ message: "Aula não encontrada" });
    }
    await aula.destroy();
    return res.status(204).send();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { materia, valor, descricao } = req.body;

    const aula = await Aula.findByPk(Number(id));
    if (!aula) {
      return res.status(404).json({ message: "Aula não encontrada" });
    }
    await aula.update({ materia, valor, descricao });
    return res.status(200).json(aula);
  }
}

export default AulasController;
