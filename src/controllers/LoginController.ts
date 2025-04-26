import passport from 'passport';
import { Request, Response } from 'express';
import { IUser } from '../models/schemas/userSchema';
import usersDB from '../models/Users';
import { UserRequest } from '../types/types';
import { userValidator } from '../config/validators';

class LoginController {
    store(req: Request, res: Response) {
        passport.authenticate('local', (error: string, user: Partial<IUser>) => {
            if (error) {
                return res.status(400).json({ errors: [{ message: error }] });
            } else {
                if (!user) {
                    return res.status(400).json({ errors: [{ message: 'Usuário ou senha inválida.' }] });
                } else {
                    req.login(user, (error) => {
                        if (error) {
                            return res.status(400).json({ errors: [{ message: error.message }] });
                        } else {
                            user.password = undefined;
                            return res.status(201).json({ user });
                        }
                    });
                }
            }
        })(req, res);
    }

    async show(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<UserRequest>;
            const fields: (keyof IUser)[] = usersDB.fields();
            const parameter: Partial<UserRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<UserRequest>[] = userValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const user: IUser | boolean | null = await usersDB.userValidation(parameter);
            if (!user) return res.status(200).json({ response: null });
            return res.status(200).json({ response: user });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    delete(req: Request, res: Response) {
        req.logout((error) => {
            if (error) return res.status(500).json({ errors: [{ message: error.message }] });
            req.session.destroy((error) => {
                if (error) return res.status(500).json({ errors: [{ message: error.message }] });
            });
            res.status(200).json({ Session: 'Finished.' });
        });
    }
}

export default new LoginController();
