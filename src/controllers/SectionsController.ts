import { ISection } from '../models/schemas/sectionSchema';
import sectionsDB from '../models/Sections';
import { sectionValidator } from '../config/validators';
import { Request, Response } from 'express';
import { SectionRequest } from '../types/types';

class SectionsController {
    async store(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body as Partial<SectionRequest>;
            const bodyValidation: Partial<SectionRequest>[] = sectionValidator(body);
            if (bodyValidation.length > 0) return res.status(400).json({ errors: bodyValidation });
            const section: ISection = await sectionsDB.create(body);
            return res.status(201).json({ response: section });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async index(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<SectionRequest>;
            const { select, limit, page } = query;
            const fields: (keyof ISection)[] = sectionsDB.fields();
            const parameter: Partial<SectionRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<SectionRequest>[] = sectionValidator(query);
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => {
                element === '_id' || element === 'level' ? (parameter[element] = query[element]) : (parameter[element] = new RegExp(`${query[element]}`, 'i'));
            });
            const section: ISection[] | null = await sectionsDB.findAll(parameter, select as string, limit as number, page as number);
            if (section?.length === 0) return res.status(200).json({ response: null });
            return res.status(200).json({ response: section });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async show(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<SectionRequest>;
            const { select } = query;
            const fields: (keyof ISection)[] = sectionsDB.fields();
            const parameter: Partial<SectionRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<SectionRequest>[] = sectionValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const section: ISection | null = await sectionsDB.findOne(parameter, select as string);
            if (!section) return res.status(200).json({ response: null });
            return res.status(200).json({ response: section });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<SectionRequest>;
            const body = req.body as Partial<SectionRequest>;
            const fields: (keyof ISection)[] = sectionsDB.fields();
            const parameter: Partial<SectionRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<SectionRequest>[] = sectionValidator(query);
            const bodyValidation: Partial<SectionRequest>[] = sectionValidator(body);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0 || bodyValidation.length > 0) return res.status(400).json({ errors: queryValidation.concat(bodyValidation) });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const section: ISection | null = await sectionsDB.findOne(parameter);
            if (!section) return res.status(404).json({ errors: [{ message: 'Section não encontrada!' }] });
            const sectionU = await sectionsDB.updateOne(parameter, body);
            return res.status(200).json({ response: sectionU });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const query = req.query as Partial<SectionRequest>;
            const fields: (keyof ISection)[] = sectionsDB.fields();
            const parameter: Partial<SectionRequest> = {};
            const param = fields.filter((element) => Object.keys(query).includes(element));
            const queryValidation: Partial<SectionRequest>[] = sectionValidator(query);
            if (param.length === 0) return res.status(400).json({ errors: [{ message: 'Parâmetro inválido!' }] });
            if (queryValidation.length > 0) return res.status(400).json({ errors: queryValidation });
            param.forEach((element) => (parameter[element] = `${query[element]}`));
            const section: ISection | null = await sectionsDB.findOne(parameter);
            if (!section) return res.status(404).json({ errors: [{ message: 'Section não encontrada!' }] });
            const sectionD = await sectionsDB.deleteOne(parameter);
            return res.status(200).json({ response: sectionD });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errors: [{ message: (error as Record<string, string>).message }] });
        }
    }
}

export default new SectionsController();
