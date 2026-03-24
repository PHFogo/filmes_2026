import { Request, Response } from "express";
import Genre from "../models/Genre";

class GenresController {
  static async findAll(req: Request, res: Response) {
    const genres = await Genre.findAll();

    res.send(genres);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const movie = await Genre.findByPk(Number(id));

    return res.status(200).send(movie);
  }

  static async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name || name == '') {
        return res.status(400).json({ message: 'Nome do Gênero é obrigatório!' });
    }

    const movie = await Genre.create({ name });
    return res.status(200).send(movie);
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    const movie = await Genre.findByPk(Number(id));
    if (movie) {
      movie?.destroy();
    } else {
      res.status(404).json({ messsage: "Gênero não encontrado" });
    }

    res.status(204).send();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const movie = await Genre.findByPk(Number(id));
    if (movie) {
      await movie.update({
        name
      });

      res.status(200).send(movie);
    } else {
      res.status(404).json({ messsage: "Gênero não encontrado" });
    }
  }
}

export default GenresController;
