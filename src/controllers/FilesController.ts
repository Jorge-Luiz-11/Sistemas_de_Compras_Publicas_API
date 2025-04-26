import { Request, Response } from 'express';
import { IFile } from '../models/schemas/fileSchema';
import filesDB from '../models/Files';
import { FileRequest } from '../types/types';
import { fileValidator } from '../config/validators';

class FilesController {
    async store(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body as Partial<FileRequest>;
            const bodyValidation: Partial<FileRequest>[] = fileValidator(body);
            if (bodyValidation.length > 0) return res.status(400).json({ errors: bodyValidation });
            const file: IFile = await filesDB.create(body);
            return res.status(201).json({ response: file });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async index(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<FileRequest>;
            delete query.file;
            const { select, include, sort, limit, page } = query;
            const fields: (keyof IFile)[] = filesDB.fields();
            const parameter: Partial<FileRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<FileRequest>[] = fileValidator(query);
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => {
                element === '_id' || element === 'process' || element === 'message'
                    ? (parameter[element] = `${query[element]}`)
                    : (parameter[element] = new RegExp(`${query[element]}`, 'i'));
            });
            const file: IFile[] | null = await filesDB.findAll(parameter, select as string, include as string, sort as string, limit as number, page as number);
            if (file?.length === 0) return res.status(200).json({ response: null });
            return res.status(200).json({ response: file });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async show(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<FileRequest>;
            delete query.file;
            const { select, include } = query;
            const fields: (keyof IFile)[] = filesDB.fields();
            const parameter: Partial<FileRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<FileRequest>[] = fileValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const file: IFile | null = await filesDB.findOne(parameter, select as string, include as string);
            if (!file) return res.status(200).json({ response: null });
            return res.status(200).json({ response: file });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<FileRequest>;
            delete query.file;
            const body = req.body as Partial<FileRequest>;
            delete body.file;
            const fields: (keyof IFile)[] = filesDB.fields();
            const parameter: Partial<FileRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<FileRequest>[] = fileValidator(query);
            const bodyValidation: Partial<FileRequest>[] = fileValidator(body);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0 || bodyValidation.length > 0) return res.status(400).json({ errors: queryValidation.concat(bodyValidation) });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const file: IFile | null = await filesDB.findOne(parameter, '-file');
            if (!file) return res.status(200).json({ response: null });
            const fileU = await filesDB.updateOne(parameter, body);
            return res.status(200).json({ response: fileU });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<FileRequest>;
            const fields: (keyof IFile)[] = filesDB.fields();
            const parameter: Partial<FileRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<FileRequest>[] = fileValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const file: IFile | null = await filesDB.findOne(parameter);
            if (!file) return res.status(200).json({ response: null });
            const fileD = await filesDB.deleteOne(parameter);
            return res.status(200).json({ response: fileD });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }
}

export default new FilesController();
