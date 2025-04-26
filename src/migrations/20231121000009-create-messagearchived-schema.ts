import 'dotenv/config';
import * as path from 'path';
import { createSchema, removeSchema } from '../../utils/schemaManager';

//This file must be edited directly by migration.
import mongoose, { Schema, Types } from 'mongoose';

export interface IMessageArchived {
    _id?: string | Types.ObjectId | null | RegExp;
    sender: string | Types.ObjectId | null | RegExp;
    receiver: string | Types.ObjectId | null | RegExp;
    process?: string | Types.ObjectId | null | RegExp;
    title: string | RegExp;
    process_title: string | RegExp;
    content: string | RegExp;
    date: string | RegExp;
    visualized: boolean | string | RegExp;
    message?: string | Types.ObjectId | null | RegExp;
    select?: string | RegExp;
    include?: string | RegExp;
    sort?: string | number | RegExp;
    limit?: number | string | RegExp;
    page?: number | string | RegExp;
}

export const messageArchivedSchema = new Schema<IMessageArchived>(
    {
        sender: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
            required: [true, 'Remetente é um campo obrigatório!'],
            index: true,
        },
        receiver: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
            required: [true, 'Destinatário é um campo obrigatório!'],
            index: true,
        },
        process: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'process',
        },
        title: {
            type: String,
            required: [true, 'Título um campo obrigatório!'],
        },
        process_title: {
            type: String,
        },
        content: {
            type: String,
        },
        date: {
            type: String,
            default: Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date()),
            required: [true, 'Data é um campo obrigatório!'],
        },
        visualized: {
            type: Boolean,
            default: false,
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
            const archivedModel = mongoose.model<IMessageArchived>('messagearchived', messageArchivedSchema);
            await archivedModel.createCollection();
            await archivedModel.createIndexes();
            await createSchema(path.join(dirname, filename), path.join(dirname, '..', 'models', 'schemas', 'messageArchivedSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },

    async down() {
        try {
            const dirname = path.dirname(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const archivedModel = mongoose.model<IMessageArchived>('messagearchived', messageArchivedSchema);
            await archivedModel.collection.drop();
            await removeSchema(path.join(dirname, '..', 'models', 'schemas', 'messageArchivedSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },
};
