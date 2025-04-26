import { IProcess } from '../models/schemas/processSchema';
import procesesDB from '../models/Processes';
import { IUser } from '../models/schemas/userSchema';
import usersDB from '../models/Users';
import { ISection } from '../models/schemas/sectionSchema';
import sectionsDB from '../models/Sections';
import { IProcessState } from '../models/schemas/processStateSchema';
import processStatesDB from '../models/ProcessStates';
import { IYear } from '../models/schemas/yearSchema';
import yearsDB from '../models/Years';
import filesDB from '../models/Files';
import { Request, Response } from 'express';
import { ProcessRequest, ProcessStateRequest, SectionRequest, YearRequest } from '../types/types';
import { processValidator } from '../config/validators';

class ProcessesController {
    async store(req: Request, res: Response): Promise<Response> {
        try {
            let body = req.body as Partial<ProcessRequest>;
            const date = Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date());
            body = { ...body, date: date };
            const bodyValidation: Partial<ProcessRequest>[] = processValidator(body);
            if (bodyValidation.length > 0) return res.status(400).json({ errors: bodyValidation });
            const user: IUser | null = await usersDB.findOne({ _id: body.user as string });
            if (!user) return res.status(404).json({ errors: [{ message: 'User não encontrado!' }] });
            const section: ISection | null = await sectionsDB.findOne({ _id: body.origin } as Partial<SectionRequest>);
            if (!section) return res.status(404).json({ errors: [{ message: 'Section não encontrada!' }] });
            const year: IYear | null = await yearsDB.findOne({ year: new Date().getFullYear().toString() });
            if (!year) await yearsDB.create({ year: body.year } as Partial<YearRequest>);
            const process: IProcess | null = await procesesDB.create(body);
            const newState: IProcessState = {
                process: process._id as string,
                state: 'Processo Cadastrado',
                anotation: `Processo Cadastrado Por ${user.name}`,
                date: date,
            };
            const state: IProcessState = await processStatesDB.create(newState);
            return res.status(201).json({ response: { process, state } });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async index(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<ProcessRequest>;
            const { select, include, sort, limit, page, aggregate } = query;
            const fields: (keyof IProcess)[] = procesesDB.fields();
            const parameter: Partial<ProcessRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<ProcessRequest>[] = processValidator(query);
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => {
                element === '_id' || element === 'user' || element === 'receiver' || element === 'section_receiver' || element === 'origin'
                    ? (parameter[element] = `${query[element]}`)
                    : (parameter[element] = new RegExp(`${query[element]}`, 'i'));
            });
            if (aggregate) {
                const processes = await procesesDB.aggregate(parameter, sort as string, limit as number, page as number, aggregate as string);
                return res.status(200).json({ response: processes });
            }
            const processes: IProcess[] | null = await procesesDB.findAll(
                parameter,
                select as string,
                include as string,
                sort as string,
                limit as number,
                page as number
            );
            if (processes?.length === 0) return res.status(200).json({ response: null });
            return res.status(200).json({ response: processes });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async show(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<ProcessRequest>;
            const { select, include, aggregate, sort } = query;
            const fields: (keyof IProcess)[] = procesesDB.fields();
            const parameter: Partial<ProcessRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<ProcessRequest>[] = processValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            if (aggregate) {
                param.forEach((element) => (parameter[element] = `${query[element]}`));
                const process = await procesesDB.aggregate(parameter, sort as string, 1, 0, aggregate as string);
                if (process[0][`${aggregate}`]) {
                    let processStates = process[0][`${aggregate}`];
                    const users = await processStates
                        .sort((a: ProcessStateRequest, b: ProcessStateRequest) => {
                            if (a.createdAt > b.createdAt) return -1;
                            if (a.createdAt < b.createdAt) return 1;
                        })
                        .map(async (element: IProcessState) =>
                            element.user ? ((element.user as Partial<IUser>) = (await usersDB.findOne({ _id: element.user })) || {}) : undefined
                        );
                    await Promise.all(users).then((data) => {
                        processStates = { ...processStates, users: data };
                        processStates = { ...process, processstates: processStates };
                    });
                    return res.status(200).json({ response: processStates[0] });
                } else {
                    return res.status(200).json({ response: process[0] });
                }
            }
            const process: IProcess | null = await procesesDB.findOne(parameter, select as string, include as string);
            if (!process) return res.status(200).json({ response: null });
            return res.status(200).json({ response: process });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<ProcessRequest>;
            const body = req.body as Partial<ProcessRequest>;
            const fields: (keyof IProcess)[] = procesesDB.fields();
            const parameter: Partial<ProcessRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<ProcessRequest>[] = processValidator(query);
            const bodyValidation: Partial<ProcessRequest>[] = processValidator(body);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0 || bodyValidation.length > 0) return res.status(400).json({ errors: queryValidation.concat(bodyValidation) });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const process: IProcess | null = await procesesDB.findOne(parameter);
            if (!process) return res.status(200).json({ response: null });
            if (body.origin) {
                const section: ISection | null = await sectionsDB.findOne({ _id: body.origin } as Partial<SectionRequest>);
                if (!section) return res.status(200).json({ response: null });
            }
            const processU = await procesesDB.updateOne(parameter, body);
            return res.status(200).json({ response: processU });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<ProcessRequest>;
            const fields: (keyof IProcess)[] = procesesDB.fields();
            const parameter: Partial<ProcessRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<ProcessRequest>[] = processValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválid!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const process: IProcess | null = await procesesDB.findOne(parameter);
            if (!process) return res.status(200).json({ response: null });
            const statesD = await processStatesDB.deleteMany({ process: process._id });
            const filesD = await filesDB.deleteMany({ process: process._id });
            const processD = await procesesDB.deleteOne(parameter);
            return res.status(200).json({ response: { processD, statesD, filesD } });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }
}

export default new ProcessesController();
