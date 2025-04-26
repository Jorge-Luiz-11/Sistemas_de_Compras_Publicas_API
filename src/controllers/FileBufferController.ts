import { Request, Response } from 'express';
import { IFile } from '../models/schemas/fileSchema';
import filesDB from '../models/Files';
import { FileRequest } from '../types/types';
import { setHeader } from '../config/mineType';
import { fileValidator } from '../config/validators';

class FileBufferController {
    async show(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<FileRequest>;
            const fields: (keyof IFile)[] = filesDB.fields();
            const parameter: Partial<FileRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<FileRequest>[] = fileValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido' }] });
            if (queryValidation.length > 0) res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const file = await filesDB.findOne(parameter);
            if (!file) return res.status(200).send({ response: null });
            res.setHeader('Content-Disposition', 'inline');
            res.setHeader('Content-Disposition', `attachment; filename="${file.filename}${file.extension}"`);
            res.setHeader('filename', `${file.filename}${file.extension}`);
            res.setHeader('Content-Type', setHeader(file.extension));
            return res.status(200).send({ response: file });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }
}

export default new FileBufferController();
