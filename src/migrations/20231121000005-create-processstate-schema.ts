import 'dotenv/config';
import * as path from 'path';
import { IProcess } from '../models/schemas/processSchema';
import { IUser } from '../models/schemas/userSchema';
import { createSchema, removeSchema } from '../../utils/schemaManager';

//This file must be edited directly by migration.
import mongoose, { Schema, Types } from 'mongoose';

export interface IProcessState {
    _id?: string | Types.ObjectId;
    process: string | Types.ObjectId;
    user?: string | Types.ObjectId;
    state: string;
    anotation?: string;
    date: string | undefined;
    createdAt?: string;
}

export const processStateSchema = new Schema<IProcessState>(
    {
        process: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'process',
            required: [true, 'Process é um campo obrigatório!'],
            index: true,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
        },
        state: {
            type: String,
            required: [true, 'State é um campo obrigatório!'],
        },
        anotation: {
            type: String,
        },
        date: {
            type: String,
            default: Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date()),
            required: [true, 'Date é um campo obrigatório!'],
        },
    },
    { timestamps: true }
);

//End

module.exports = {
    async up() {
        try {
            const dirname = path.dirname(__filename);
            const filename = path.basename(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const stateModel = mongoose.model<IProcessState>('processstate', processStateSchema);
            await stateModel.createCollection();
            await stateModel.createIndexes();
            const user = await mongoose.model<IUser>('user').findOne({ name: 'ADM' });
            const firstProcess = await mongoose.model<IProcess>('process').findOne();

            if (firstProcess && user) {
                await stateModel.create({
                    process: firstProcess._id as string,
                    state: 'Processo Cadastrado',
                    anotation: `Processo Cadastrado Por ${user.name}`,
                    date: Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date()),
                });
            } else {
                throw new Error('Error during the state creation');
            }
            await createSchema(path.join(dirname, filename), path.join(dirname, '..', 'models', 'schemas', 'processStateSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },

    async down() {
        try {
            const dirname = path.dirname(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const stateModel = mongoose.model<IProcessState>('processstate', processStateSchema);
            await stateModel.collection.drop();
            await removeSchema(path.join(dirname, '..', 'models', 'schemas', 'processStateSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },
};
