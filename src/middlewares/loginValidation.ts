import jwt from 'jsonwebtoken';
import 'dotenv/config';
import usersDB from '../models/Users';
import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: ['Faça o login para o acesso.'] });
    }
    const [, token] = authorization.split(' ');

    try {
        const datas = jwt.verify(token, process.env.SECRET as string);
        const { id, name } = datas as { id: string; name: string };
        const user = await usersDB.findOne({ _id: id });
        if (user && user.name !== name) {
            return res.status(401).json({ error: ['Token expirado ou inválido.'] });
        }
        return next();
    } catch (error) {
        return res.status(401).json({ error: ['Token expirado ou inválido.'] });
    }
};
