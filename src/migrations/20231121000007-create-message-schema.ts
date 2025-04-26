import 'dotenv/config';
import * as path from 'path';
import { createSchema, removeSchema } from '../../utils/schemaManager';
import { IUser } from './20231121000001-create-user-schema';

//This file must be edited directly by migration.
import mongoose, { Schema, Types } from 'mongoose';

export interface IMessage {
    _id?: string | Types.ObjectId;
    sender: string | Types.ObjectId | null;
    receiver: string | Types.ObjectId | null;
    process?: string | Types.ObjectId | null;
    title: string;
    process_title: string;
    content: string;
    date: string;
    visualized: boolean;
}

export const messageSchema = new Schema<IMessage>(
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
            const messageModel = mongoose.model<IMessage>('message', messageSchema);
            await messageModel.createCollection();
            await messageModel.createIndexes();
            const user = await mongoose.model<IUser>('user').findOne({ name: 'ADM' });
            await messageModel.create({
                receiver: user?._id,
                sender: user?._id,
                title: 'Boas Vindas',
                process_title: 'Sem Processo',
                content:
                    '<p style="text-align: center;">Seja bem vindo ao Sistema de Compras Públicas</p><p style="text-align: \
                    center;">Esse é um sistema desenvolvido para gerenciamento e para facilitação do criamento de processos licitatórios.</p><p \
                    style="text-align: left;"><br></p>',
                date: Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short' }).format(new Date()),
            });
            await createSchema(path.join(dirname, filename), path.join(dirname, '..', 'models', 'schemas', 'messageSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },

    async down() {
        try {
            const dirname = path.dirname(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const messageModel = mongoose.model<IMessage>('message', messageSchema);
            await messageModel.collection.drop();
            await removeSchema(path.join(dirname, '..', 'models', 'schemas', 'messageSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },
};
