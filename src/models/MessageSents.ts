import mongoose, { ClientSession, SortOrder, UpdateWriteOpResult, mongo } from 'mongoose';
import { MessageRequest } from '../types/types';
import { IMessageSent, messageSentSchema } from './schemas/messageSentSchema';

const messageSentModel = mongoose.model<IMessageSent>('messagesent', messageSentSchema);

class MessageSent {
    async create(body: Partial<MessageRequest>, session?: ClientSession): Promise<IMessageSent> {
        try {
            const message: IMessageSent = await new messageSentModel(body).save({ session });
            return message;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    // eslint-disable-next-line prettier/prettier
    async findAll(parameter: Partial<MessageRequest>, select = '', include = '', sort: string | number = -1, limit = 0, page = 0): Promise<IMessageSent[] | null> {
        try {
            const result: IMessageSent[] | null = await messageSentModel
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

    async findOne(parameter: Partial<MessageRequest>, select = '', include = ''): Promise<IMessageSent | null> {
        try {
            const result: IMessageSent | null = await messageSentModel.findOne(parameter).select(select).populate(include);
            return result;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async updateOne(parameter: Partial<MessageRequest>, body: Partial<IMessageSent>, session?: ClientSession): Promise<UpdateWriteOpResult> {
        try {
            const message: UpdateWriteOpResult = await messageSentModel.updateOne(parameter, { $set: body }, { session, runValidators: true });
            return message;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteOne(parameter: Partial<MessageRequest>, session?: ClientSession): Promise<mongo.DeleteResult> {
        try {
            const message: mongo.DeleteResult = await messageSentModel.deleteOne(parameter, { session });
            return message;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteMany(parameter: Partial<MessageRequest>, session?: ClientSession): Promise<mongo.DeleteResult> {
        try {
            const messages: mongo.DeleteResult = await messageSentModel.deleteMany(parameter, { session });
            return messages;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    fields(): (keyof IMessageSent)[] {
        try {
            const fields = Object.values(messageSentModel.schema.paths).map((element) => element.path as keyof IMessageSent);
            return fields;
        } catch (error) {
            throw new Error(error as string);
        }
    }
}

export default new MessageSent();
