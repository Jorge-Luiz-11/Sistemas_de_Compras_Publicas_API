import mongoose, { ClientSession, SortOrder, UpdateWriteOpResult, mongo } from 'mongoose';
import { IMessageArchived, messageArchivedSchema } from './schemas/messageArchivedSchema';

const messageArchivedModel = mongoose.model<IMessageArchived>('messagearchived', messageArchivedSchema);

class MessageArchiverd {
    async create(body: Partial<IMessageArchived>, session?: ClientSession): Promise<IMessageArchived> {
        try {
            const message: IMessageArchived = await new messageArchivedModel(body).save({ session });
            return message;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    // eslint-disable-next-line prettier/prettier
    async findAll(parameter: Partial<IMessageArchived>, select = '', include = '', sort: string | number = -1, limit = 0, page = 0): Promise<IMessageArchived[] | null> {
        try {
            const result: IMessageArchived[] | null = await messageArchivedModel
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

    async findOne(parameter: Partial<IMessageArchived>, select = '', include = ''): Promise<IMessageArchived | null> {
        try {
            const result: IMessageArchived | null = await messageArchivedModel.findOne(parameter).select(select).populate(include);
            return result;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async updateOne(parameter: Partial<IMessageArchived>, body: Partial<IMessageArchived>, session?: ClientSession): Promise<UpdateWriteOpResult> {
        try {
            const message: UpdateWriteOpResult = await messageArchivedModel.updateOne(parameter, { $set: body }, { session, runValidators: true });
            return message;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteOne(parameter: Partial<IMessageArchived>, session?: ClientSession): Promise<mongo.DeleteResult> {
        try {
            const message: mongo.DeleteResult = await messageArchivedModel.deleteOne(parameter, { session });
            return message;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteMany(parameter: Partial<IMessageArchived>, session?: ClientSession): Promise<mongo.DeleteResult> {
        try {
            const messages: mongo.DeleteResult = await messageArchivedModel.deleteMany(parameter, { session });
            return messages;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    fields(): (keyof IMessageArchived)[] {
        try {
            const fields: (keyof IMessageArchived)[] = Object.values(messageArchivedModel.schema.paths).map(
                (element) => element.path as keyof IMessageArchived
            );
            return fields;
        } catch (error) {
            throw new Error(error as string);
        }
    }
}

export default new MessageArchiverd();
