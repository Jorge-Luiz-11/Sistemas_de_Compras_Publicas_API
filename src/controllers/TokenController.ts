import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import usersDB from '../models/Users';

class TokenController {
    async store(req: Request, res: Response): Promise<Response> {
        const { name, password } = req.body;
        try {
            const user = await usersDB.findOne({ name }, '', 'section');
            if (!user) {
                return res.status(400).json({ errors: [{ message: 'Usuário não encontrado!' }] });
            }
            const match = bcrypt.compareSync(password, user.password);
            if (!match) {
                return res.status(400).json({ errors: [{ message: 'Senha inválida!' }] });
            }
            const token = jwt.sign({ id: user._id, name: user.name }, process.env.SECRET as string, {
                expiresIn: '1h',
            });
            return res.json({ token });
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    }
}

export default new TokenController();
