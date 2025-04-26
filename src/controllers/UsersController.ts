import { Request, Response } from 'express';
import { IUser } from '../models/schemas/userSchema';
import usersDB from '../models/Users';
import { ISection } from '../models/schemas/sectionSchema';
import sectionsDB from '../models/Sections';
import { SectionRequest, UserRequest } from '../types/types';
import { userValidator } from '../config/validators';

class UsersController {
    async store(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body as Partial<UserRequest>;
            const bodyValidation: Partial<UserRequest>[] = userValidator(body);
            if (bodyValidation.length > 0) return res.status(400).json({ errors: bodyValidation });
            if (!body.section) return res.status(400).json({ errors: [{ message: 'Valor de section precisa ser informado!' }] });
            const section: ISection | null = await sectionsDB.findOne({ _id: body.section } as Partial<SectionRequest>);
            if (!section) return res.status(404).json({ errors: [{ message: 'Section não encontrada!' }] });
            const user: IUser = await usersDB.create(body);
            return res.status(201).json({ response: user });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async index(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<UserRequest>;
            const { select, include, limit, page } = query;
            const fields: (keyof IUser)[] = usersDB.fields();
            const parameter: Partial<UserRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<UserRequest>[] = userValidator(query);
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => {
                element === '_id' || element === 'section'
                    ? (parameter[element] = `${query[element]}`)
                    : (parameter[element] = new RegExp(`${query[element]}`, 'i'));
            });
            const user: IUser[] | null = await usersDB.findAll(parameter, select as string, include as string, limit as number, page as number);
            if (user?.length === 0) return res.status(200).json({ response: null });
            return res.status(200).json({ response: user });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async show(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<UserRequest>;
            const { select, include } = query;
            const fields: (keyof IUser)[] = usersDB.fields();
            const parameter: Partial<UserRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<UserRequest>[] = userValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const user: IUser | null = await usersDB.findOne(parameter, select as string, include as string);
            if (!user) return res.status(200).json({ response: null });
            return res.status(200).json({ response: user });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<UserRequest>;
            const body = req.body as Partial<UserRequest>;
            const fields: (keyof IUser)[] = usersDB.fields();
            const parameter: Partial<UserRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<UserRequest>[] = userValidator(query);
            const bodyValidation: Partial<UserRequest>[] = userValidator(body);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0 || bodyValidation.length > 0) return res.status(400).json({ errors: queryValidation.concat(bodyValidation) });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const user: IUser | null = await usersDB.findOne(parameter);
            if (!user) return res.status(404).json({ errors: [{ message: 'User não encontrado!' }] });
            if (body.section) {
                const section: ISection | null = await sectionsDB.findOne({ _id: body.section } as Partial<SectionRequest>);
                if (!section) return res.status(404).json({ errors: [{ message: 'Section não encontrada!' }] });
            }
            const userU = await usersDB.updateOne(parameter, body);
            return res.status(200).json({ userU });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<UserRequest>;
            const fields: (keyof IUser)[] = usersDB.fields();
            const parameter: Partial<UserRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<UserRequest>[] = userValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const user: IUser | null = await usersDB.findOne(parameter);
            if (!user) return res.status(404).json({ errors: [{ message: 'User não encontrado!' }] });
            const userD = await usersDB.deleteOne(parameter);
            return res.status(200).json({ userD });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }
}

export default new UsersController();
