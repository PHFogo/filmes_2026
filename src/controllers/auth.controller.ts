import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }, raw: true });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'Usuário ou senha inválidos!' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password!);
        if (!isPasswordValid) {
            return res.status(404).json({ message: 'Usuário ou senha inválidos!' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                lastName: user.lastName
            },
            process.env.JWT_SECRET! as string,
            {
                expiresIn: "1m"
            }
        );

        res.status(200).json({
            message: 'Usuário autenticado',
            token
        });
    }

}

export default AuthController;