import 'dotenv/config';
import * as path from 'path';
import { createSchema, removeSchema } from '../../utils/schemaManager';

//This file must be edited directly by migration.
import mongoose, { Schema, Types } from 'mongoose';

export interface IMessageSent {
    _id?: string | Types.ObjectId;
    sender: string | Types.ObjectId | null;
    receiver: string | Types.ObjectId | null;
    section_receiver: string | Types.ObjectId | null;
    process?: string | Types.ObjectId | null;
    title: string;
    process_title: string;
    content: string;
    date: string;
    visualized: boolean;
}

export const messageSentSchema = new Schema<IMessageSent>(
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
            index: true,
        },
        section_receiver: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'section',
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
            const sentModel = mongoose.model<IMessageSent>('messagesent', messageSentSchema);
            await sentModel.createCollection();
            await sentModel.createIndexes();
            await createSchema(path.join(dirname, filename), path.join(dirname, '..', 'models', 'schemas', 'messageSentSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },

    async down() {
        try {
            const dirname = path.dirname(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const sentModel = mongoose.model<IMessageSent>('messagesent', messageSentSchema);
            await sentModel.collection.drop();
            await removeSchema(path.join(dirname, '..', 'models', 'schemas', 'messageSentSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },
};
