import { Request, Response } from 'express';
import { YearRequest } from '../types/types';
import { IYear } from '../models/schemas/yearSchema';
import yearsDB from '../models/Years';
import { yearValidator } from '../config/validators';

class YearsController {
    async store(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body as Partial<YearRequest>;
            const bodyValidation: Partial<YearRequest>[] = yearValidator(body);
            if (bodyValidation.length > 0) return res.status(400).json({ errors: bodyValidation });
            const year: IYear = await yearsDB.create(body);
            return res.status(201).json({ response: year });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }
    async index(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<YearRequest>;
            const { select, sort, limit, page } = query;
            const fields: (keyof IYear)[] = yearsDB.fields();
            const parameter: Partial<YearRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<YearRequest>[] = yearValidator(query);
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => {
                element !== '_id' ? (parameter[element] = new RegExp(`${query[element]}`, 'i')) : (parameter[element] = query[element]);
            });
            const years: IYear[] | null = await yearsDB.findAll(parameter, select as string, sort as number | string, limit as number, page as number);
            if (years?.length === 0) return res.status(400).json({ errors: [{ message: 'Year não encontrado!' }] });
            return res.status(200).json({ response: years });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async show(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<YearRequest>;
            const { select } = query;
            const fields: (keyof YearRequest)[] = yearsDB.fields();
            const parameter: Partial<YearRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<YearRequest>[] = yearValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const year: IYear | null = await yearsDB.findOne(parameter, select as string);
            if (!year) {
                return res.status(200).json({ errors: [{ message: 'Year não encontrado!' }] });
            }
            return res.status(200).json({ response: year });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<YearRequest>;
            const body = req.body as Partial<YearRequest>;
            const fields: (keyof IYear)[] = yearsDB.fields();
            const parameter: Partial<YearRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<YearRequest>[] = yearValidator(query);
            const bodyValidation: Partial<YearRequest>[] = yearValidator(body);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0 || bodyValidation.length > 0) return res.status(400).json({ errors: queryValidation.concat(bodyValidation) });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const year: IYear | null = await yearsDB.findOne(parameter);
            if (!year) return res.status(200).json({ errors: [{ message: 'Year não encontrado!' }] });
            const yearU = await yearsDB.updateOne(parameter, body);
            return res.status(200).json({ yearU });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<YearRequest>;
            const fields: (keyof IYear)[] = yearsDB.fields();
            const parameter: Partial<YearRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<YearRequest>[] = yearValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const year: IYear | null = await yearsDB.findOne(parameter);
            if (!year) return res.status(200).json({ errors: [{ message: 'Year não encontrado!' }] });
            const yearD = await yearsDB.deleteOne(parameter);
            return res.status(200).json({ yearD });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }
}

export default new YearsController();
