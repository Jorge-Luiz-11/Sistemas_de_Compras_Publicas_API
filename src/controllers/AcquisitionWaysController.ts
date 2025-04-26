import { Request, Response } from 'express';
import { AcquisitionWayRequest } from '../types/types';
import { IAcquisitionWay } from '../models/schemas/acquisitionWaySchema';
import acquisitionDB from '../models/AcquisitionWays';
import { acquisitionWayValidator } from '../config/validators';

class AcquisitionWaysController {
    async store(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body as Partial<AcquisitionWayRequest>;
            const bodyValidation: Partial<AcquisitionWayRequest>[] = acquisitionWayValidator(body);
            if (bodyValidation.length > 0) return res.status(400).json({ errors: bodyValidation });
            const response: IAcquisitionWay = await acquisitionDB.create(body);
            return res.status(201).json({ response });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }
    async index(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<AcquisitionWayRequest>;
            const { select, limit, page } = query;
            const fields: (keyof IAcquisitionWay)[] = acquisitionDB.fields();
            const parameter: Partial<AcquisitionWayRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<AcquisitionWayRequest>[] = acquisitionWayValidator(query);
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => {
                element !== '_id' ? (parameter[element] = new RegExp(`${query[element]}`, 'i')) : (parameter[element] = query[element]);
            });
            const response: IAcquisitionWay[] | null = await acquisitionDB.findAll(parameter, select as string, limit as number, page as number);
            if (response?.length === 0) return res.status(200).json({ response: null });
            return res.status(200).json({ response });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async show(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<AcquisitionWayRequest>;
            const { select } = query;
            const fields: (keyof AcquisitionWayRequest)[] = acquisitionDB.fields();
            const parameter: Partial<AcquisitionWayRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<AcquisitionWayRequest>[] = acquisitionWayValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const response: IAcquisitionWay | null = await acquisitionDB.findOne(parameter, select as string);
            if (!response) {
                return res.status(200).json({ response: null });
            }
            return res.status(200).json({ response });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<AcquisitionWayRequest>;
            const body = req.body as Partial<AcquisitionWayRequest>;
            const fields: (keyof IAcquisitionWay)[] = acquisitionDB.fields();
            const parameter: Partial<AcquisitionWayRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<AcquisitionWayRequest>[] = acquisitionWayValidator(query);
            const bodyValidation: Partial<AcquisitionWayRequest>[] = acquisitionWayValidator(body);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0 || bodyValidation.length > 0) return res.status(400).json({ errors: queryValidation.concat(bodyValidation) });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const response: IAcquisitionWay | null = await acquisitionDB.findOne(parameter);
            if (!response) return res.status(200).json({ errors: [{ message: 'AcquisitionWay não encontrado!' }] });
            const responseU = await acquisitionDB.updateOne(parameter, body);
            return res.status(200).json({ responseU });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<AcquisitionWayRequest>;
            const fields: (keyof IAcquisitionWay)[] = acquisitionDB.fields();
            const parameter: Partial<AcquisitionWayRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<AcquisitionWayRequest>[] = acquisitionWayValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const response: IAcquisitionWay | null = await acquisitionDB.findOne(parameter);
            if (!response) return res.status(200).json({ errors: [{ message: 'AcquisitionWay não encontrado!' }] });
            const responseD = await acquisitionDB.deleteOne(parameter);
            return res.status(200).json({ responseD });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }
}

export default new AcquisitionWaysController();
