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
