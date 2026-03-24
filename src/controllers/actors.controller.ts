import { Request, Response } from "express";
import Actor from "../models/Actor";

class ActorsController {
  static async findAll(req: Request, res: Response) {
    const actors = await Actor.findAll();

    res.send(actors);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const movie = await Actor.findByPk(Number(id));

    return res.status(200).send(movie);
  }

  static async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name || name == '') {
        return res.status(400).json({ message: 'Nome do Ator é obrigatório!' });
    }

    const movie = await Actor.create({ name });
    return res.status(200).send(movie);
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    const movie = await Actor.findByPk(Number(id));
    if (movie) {
      movie?.destroy();
    } else {
      res.status(404).json({ messsage: "Ator não encontrado" });
    }

    res.status(204).send();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const actor = await Actor.findByPk(Number(id));
    if (actor) {
      await actor.update({
        name
      });

      res.status(200).send(actor);
    } else {
      res.status(404).json({ messsage: "Ator não encontrado" });
    }
  }
}

export default ActorsController;
