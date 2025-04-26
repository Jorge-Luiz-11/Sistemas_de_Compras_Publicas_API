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
