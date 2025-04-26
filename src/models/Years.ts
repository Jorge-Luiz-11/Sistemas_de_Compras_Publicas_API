import mongoose, { ClientSession, SortOrder, UpdateWriteOpResult, mongo } from 'mongoose';
import { YearRequest } from '../types/types';
import { IYear, yearSchema } from './schemas/yearSchema';

const yearModel = mongoose.model<IYear>('year', yearSchema);

class Years {
    async create(body: Partial<YearRequest>, session?: ClientSession): Promise<IYear> {
        try {
            const year: IYear = await new yearModel(body).save({ session });
            return year;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async findAll(parameter: Partial<YearRequest> = {}, select = '', sort: string | number = -1, limit = 0, page = 0): Promise<IYear[] | null> {
        try {
            const result: IYear[] | null = await yearModel
                .find(parameter)
                .select(select)
                .sort({ createdAt: sort as SortOrder })
                .skip(limit * page)
                .limit(limit);
            return result;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async findOne(parameter: Partial<YearRequest>, select = ''): Promise<IYear | null> {
        try {
            const result: IYear | null = await yearModel.findOne(parameter).select(select);
            return result;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async updateOne(parameter: Partial<YearRequest>, body: Partial<YearRequest>): Promise<UpdateWriteOpResult> {
        try {
            const year: UpdateWriteOpResult = await yearModel.updateOne(parameter, { $set: body }, { runValidators: true });
            return year;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteOne(parameter: Partial<YearRequest>): Promise<mongo.DeleteResult> {
        try {
            const year: mongo.DeleteResult = await yearModel.deleteOne(parameter);
            return year;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    fields(): (keyof IYear)[] {
        try {
            const fields = Object.values(yearModel.schema.paths).map((element) => element.path as keyof IYear);
            return fields;
        } catch (error) {
            throw new Error(error as string);
        }
    }
}

export default new Years();
