//This file must be edited directly by migration.
import { Schema, Types } from 'mongoose';

export interface IAcquisitionWay {
    _id?: string | Types.ObjectId;
    name: string;
}

export const acquisitionWaySchema = new Schema<IAcquisitionWay>({
    name: {
        type: String,
        required: [true, 'name é um campo obrigatório!'],
    },
});

//End
