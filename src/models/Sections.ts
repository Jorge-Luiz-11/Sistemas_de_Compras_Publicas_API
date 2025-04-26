import mongoose, { UpdateWriteOpResult, mongo } from 'mongoose';
import { SectionRequest } from '../types/types';
import { ISection, sectionSchema } from './schemas/sectionSchema';

const sectionModel = mongoose.model<ISection>('section', sectionSchema);

class Sections {
    async create(body: Partial<SectionRequest>): Promise<ISection> {
        try {
            const section: ISection = await new sectionModel(body).save();
            return section;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async findAll(parameter: Partial<SectionRequest>, select = '', limit = 0, page = 0): Promise<ISection[] | null> {
        try {
            const result: ISection[] | null = await sectionModel
                .find(parameter)
                .select(select)
                .skip(limit * page)
                .limit(limit);
            return result;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async findOne(parameter: Partial<SectionRequest>, select = ''): Promise<ISection | null> {
        try {
            const result: ISection | null = await sectionModel.findOne(parameter).select(select);
            return result;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async updateOne(parameter: Partial<SectionRequest>, body: Partial<SectionRequest>): Promise<UpdateWriteOpResult> {
        try {
            const section: UpdateWriteOpResult = await sectionModel.updateOne(parameter, { $set: body }, { runValidators: true });
            return section;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteOne(parameter: Partial<SectionRequest>): Promise<mongo.DeleteResult> {
        try {
            const section: mongo.DeleteResult = await sectionModel.deleteOne(parameter);
            return section;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    fields(): (keyof ISection)[] {
        try {
            const fields = Object.values(sectionModel.schema.paths).map((element) => element.path as keyof ISection);
            return fields;
        } catch (error) {
            throw new Error(error as string);
        }
    }
}

export default new Sections();
