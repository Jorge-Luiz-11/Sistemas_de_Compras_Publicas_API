import mongoose, { ClientSession, SortOrder, UpdateWriteOpResult, mongo } from 'mongoose';
import { FileRequest } from '../types/types';
import { IFile, fileSchema } from './schemas/fileSchema';

const fileModel = mongoose.model<IFile>('file', fileSchema);

class Files {
    private encodingName(originalName: string): string[] {
        try {
            const original = Buffer.from(originalName, 'latin1').toString('utf8');
            const clearName = original.slice(0, original.lastIndexOf('.')).replace(/\./g, ' ');
            const extension = original.slice(original.lastIndexOf('.', original.length - 1));
            const name = [clearName, extension];
            return name;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async create(body: Partial<FileRequest>, session?: ClientSession): Promise<IFile> {
        try {
            const name: string[] = this.encodingName(body.originalname as string);
            body = {
                ...body,
                filename: name[0],
                extension: name[1],
                originalname: undefined,
            };
            const file: IFile = await new fileModel(body).save({ session });
            return file;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async findAll(parameter: Partial<FileRequest>, select = '', include = '', sort: string | number = -1, limit = 0, page = 0): Promise<IFile[] | null> {
        try {
            const result: IFile[] | null = await fileModel
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

    async findOne(parameter: Partial<FileRequest>, select = '', include = ''): Promise<IFile | null> {
        try {
            const result: IFile | null = await fileModel.findOne(parameter).select(select).populate(include);
            return result;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async updateOne(parameter: Partial<FileRequest>, body: Partial<FileRequest>, session?: ClientSession): Promise<UpdateWriteOpResult> {
        try {
            body = { filename: body.filename };
            const file: UpdateWriteOpResult = await fileModel.updateOne(parameter, { $set: body }, { session, runValidators: true });
            return file;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteOne(parameter: Partial<FileRequest>, session?: ClientSession): Promise<mongo.DeleteResult> {
        try {
            const file: mongo.DeleteResult = await fileModel.deleteOne(parameter, { session });
            return file;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteMany(parameter: Partial<FileRequest>, session?: ClientSession): Promise<mongo.DeleteResult> {
        try {
            const files: mongo.DeleteResult = await fileModel.deleteMany(parameter, { session });
            return files;
        } catch (error) {
            throw new Error(error as string);
        }
    }

    fields(): (keyof IFile)[] {
        try {
            const fields = Object.values(fileModel.schema.paths).map((element) => element.path as keyof IFile);
            return fields;
        } catch (error) {
            throw new Error(error as string);
        }
    }
}

export default new Files();
