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
