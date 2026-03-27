import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email }, raw: true });
            if (!user) {
                return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password!);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    name: user.name,
                    tipo: user.tipo,
                },
                process.env.JWT_SECRET! as string,
                {
                    expiresIn: "8h"
                }
            );

            res.status(200).json({
                message: 'Usuário autenticado',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    tipo: user.tipo,
                }
            });
        } catch (err) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

}

export default AuthController;