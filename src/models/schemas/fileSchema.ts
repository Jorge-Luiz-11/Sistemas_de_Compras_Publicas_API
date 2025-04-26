//This file must be edited directly by migration.
import mongoose, { Schema, Types } from 'mongoose';

export interface IFile {
    _id?: string | Types.ObjectId;
    file: Buffer;
    originalname?: string;
    filename: string;
    extension: string;
    process?: string | Types.ObjectId;
    message?: string | Types.ObjectId;
}

export const fileSchema = new Schema<IFile>(
    {
        file: {
            type: Buffer,
            required: [true, 'File é um campo obrigatório!'],
        },
        filename: {
            type: String,
            required: [true, 'Filename é um campo obrigatório!'],
        },
        extension: {
            type: String,
            required: [true, 'Extension é um campo obrigatório!'],
        },
        process: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'process',
            index: true,
        },
        message: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'message',
        },
    },
    { timestamps: true }
);

//End
