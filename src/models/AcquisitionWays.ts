import mongoose, { UpdateWriteOpResult, mongo } from 'mongoose';
import { AcquisitionWayRequest } from '../types/types';
import { IAcquisitionWay, acquisitionWaySchema } from './schemas/acquisitionWaySchema';

const AcquisitionWayModel = mongoose.model<IAcquisitionWay>('acquisitionway', acquisitionWaySchema);

class AcquisitionWays {
    async create(body: Partial<AcquisitionWayRequest>): Promise<IAcquisitionWay> {
        try {
            const response: IAcquisitionWay = await new AcquisitionWayModel(body).save();
            return response;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async findAll(parameter: Partial<AcquisitionWayRequest>, select = '', limit = 0, page = 0): Promise<IAcquisitionWay[]> {
        try {
            const response: IAcquisitionWay[] = await AcquisitionWayModel.find(parameter)
                .select(select)
                .skip(limit * page)
                .limit(limit);
            return response;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async findOne(parameter: Partial<AcquisitionWayRequest>, select = ''): Promise<IAcquisitionWay | null> {
        try {
            const response: IAcquisitionWay | null = await AcquisitionWayModel.findOne(parameter).select(select);
            return response;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async updateOne(parameter: Partial<AcquisitionWayRequest>, body: Partial<AcquisitionWayRequest>): Promise<UpdateWriteOpResult> {
        try {
            const response: UpdateWriteOpResult = await AcquisitionWayModel.updateOne(parameter, { $set: body }, { runValidators: true });
            return response;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteOne(parameter: Partial<AcquisitionWayRequest>): Promise<mongo.DeleteResult> {
        try {
            const response: mongo.DeleteResult = await AcquisitionWayModel.deleteOne(parameter);
            return response;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    fields(): (keyof IAcquisitionWay)[] {
        try {
            const fields = Object.values(AcquisitionWayModel.schema.paths).map((element) => element.path as keyof IAcquisitionWay);
            return fields;
        } catch (error) {
            throw new Error(error as string);
        }
    }
}

export default new AcquisitionWays();
