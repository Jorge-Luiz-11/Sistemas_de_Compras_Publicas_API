import 'dotenv/config';
import * as path from 'path';
import { IUser } from '../models/schemas/userSchema';
import { ISection } from '../models/schemas/sectionSchema';
import { IYear } from '../models/schemas/yearSchema';
import { createSchema, removeSchema } from '../../utils/schemaManager';

//This file must be edited directly by migration.
import mongoose, { Schema, Types } from 'mongoose';

export interface IProcess {
    _id?: string | Types.ObjectId;
    user?: string | Types.ObjectId | null;
    receiver?: string | Types.ObjectId | null;
    section_receiver?: string | Types.ObjectId | null;
    nup?: string;
    done: boolean | undefined;
    origin: string | Types.ObjectId;
    title: string;
    category?: string;
    description?: string;
    date: string | undefined;
    year: string | undefined;
}

export const processSchema = new Schema<IProcess>(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
        },
        receiver: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
        },
        section_receiver: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'section',
        },
        nup: {
            type: String,
        },
        done: {
            type: Boolean,
            default: false,
            required: [true, 'Done é um campo obrigatório!'],
        },
        origin: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'section',
            required: [true, 'Origin é um campo obrigatório!'],
        },
        title: {
            type: String,
            required: [true, 'Título é um campo obrigatório!'],
        },
        category: {
            type: String,
        },
        description: {
            type: String,
        },
        date: {
            type: String,
            default: Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date()),
            required: [true, 'Date é um campo obrigatório!'],
        },
        year: {
            type: String,
            default: new Date().getFullYear().toString(),
            index: true,
            required: [true, 'Year é um campo obrigatório!'],
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
            const processModel = mongoose.model<IProcess>('process', processSchema);
            await processModel.createCollection();
            await processModel.createIndexes();

            const user = await mongoose.model<IUser>('user').findOne({ name: 'ADM' });
            const section = await mongoose.model<ISection>('section').findOne({ name: 'Informática' });
            const year = await mongoose.model<IYear>('year').findOne();

            if (user && section && year) {
                await processModel.create({
                    user: user._id,
                    origin: section._id,
                    title: 'Aquisição de Computadores',
                    year: year.year,
                    date: Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date()),
                });
            } else {
                throw new Error('Error during process creation');
            }
            await createSchema(path.join(dirname, filename), path.join(dirname, '..', 'models', 'schemas', 'processSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },

    async down() {
        try {
            const dirname = path.dirname(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const processModel = mongoose.model<IProcess>('process', processSchema);
            await processModel.collection.drop();
            await removeSchema(path.join(dirname, '..', 'models', 'schemas', 'processSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },
};
