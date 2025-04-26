//This file must be edited directly by migration.
import { Schema, Types } from 'mongoose';

export interface IYear {
    _id?: string | Types.ObjectId;
    year: string;
}

export const yearSchema = new Schema<IYear>(
    {
        year: {
            type: String,
            required: [true, 'Year é um campo obrigatório'],
            unique: true,
        },
    },
    { timestamps: true }
);

//End
