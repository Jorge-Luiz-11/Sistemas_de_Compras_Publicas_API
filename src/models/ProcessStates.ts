import mongoose, { ClientSession, SortOrder, UpdateWriteOpResult, mongo } from 'mongoose';
import { IUser } from './schemas/userSchema';
import { ProcessStateRequest } from '../types/types';
import { IProcessState, processStateSchema } from './schemas/processStateSchema';

const processStateModel = mongoose.model<IProcessState>('processstate', processStateSchema);

class ProcessStates {
    async create(body: Partial<ProcessStateRequest>, session?: ClientSession): Promise<IProcessState> {
        try {
            const processState = await new processStateModel(body).save({ session });
            return processState;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async createNewProcess(body: Partial<ProcessStateRequest>, session?: ClientSession): Promise<IProcessState> {
        try {
            const processState = await new processStateModel(body).save({ session });
            return processState;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    // eslint-disable-next-line prettier/prettier
    async createNewMessage(process: Partial<ProcessStateRequest>, sender: Partial<IUser>, receiver:Partial<IUser>, session?: ClientSession): Promise<IProcessState> {
        try {
            const newState: IProcessState = {
                process: process._id as string,
                state: 'Em Transferência',
                anotation: `De ${sender.name} para ${receiver.name}`,
                date: undefined,
            };
            const processState = await new processStateModel(newState).save({ session });
            return processState;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    // eslint-disable-next-line prettier/prettier
    async findAll(parameter: Partial<ProcessStateRequest>, select = '', include = '', sort: string | number = -1, limit = 0, page = 0): Promise<IProcessState[] | null> {
        try {
            const result: IProcessState[] | null = await processStateModel
                .find(parameter)
                .select(select)
                .populate(include)
                .sort({ createdAt: sort as SortOrder })
                .skip(limit * page)
                .limit(limit);
            return result;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async findOne(parameter: Partial<ProcessStateRequest>, select = '', include = ''): Promise<IProcessState | null> {
        try {
            const result: IProcessState | null = await processStateModel.findOne(parameter).select(select).populate(include);
            return result;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async updateOne(parameter: Partial<ProcessStateRequest>, body: Partial<ProcessStateRequest>, session?: ClientSession): Promise<UpdateWriteOpResult> {
        try {
            const state: UpdateWriteOpResult = await processStateModel.updateOne(parameter, { $set: body }, { session, runValidators: true });
            return state;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteOne(parameter: Partial<ProcessStateRequest>, session?: ClientSession): Promise<mongo.DeleteResult> {
        try {
            const state: mongo.DeleteResult = await processStateModel.deleteOne(parameter, { session });
            return state;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteMany(parameter: Partial<ProcessStateRequest>, session?: ClientSession): Promise<mongo.DeleteResult> {
        try {
            const states: mongo.DeleteResult = await processStateModel.deleteMany(parameter, { session });
            return states;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    fields(): (keyof IProcessState)[] {
        try {
            const fields = Object.values(processStateModel.schema.paths).map((element) => element.path as keyof IProcessState);
            return fields;
        } catch (error) {
            throw new Error(error as string);
        }
    }
}

export default new ProcessStates();
