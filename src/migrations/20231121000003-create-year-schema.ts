import 'dotenv/config';
import mongoose from 'mongoose';
import * as path from 'path';
import { createSchema, removeSchema } from '../../utils/schemaManager';

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

module.exports = {
    async up() {
        try {
            const dirname = path.dirname(__filename);
            const filename = path.basename(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const yearModel = mongoose.model<IYear>('year', yearSchema);
            await yearModel.createCollection();
            await yearModel.createIndexes();
            await yearModel.create({ year: new Date().getFullYear().toString() });
            await createSchema(path.join(dirname, filename), path.join(dirname, '..', 'models', 'schemas', 'yearSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },

    async down() {
        try {
            const dirname = path.dirname(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const yearModel = mongoose.model<IYear>('year', yearSchema);
            await yearModel.collection.drop();
            await removeSchema(path.join(dirname, '..', 'models', 'schemas', 'yearSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },
};
