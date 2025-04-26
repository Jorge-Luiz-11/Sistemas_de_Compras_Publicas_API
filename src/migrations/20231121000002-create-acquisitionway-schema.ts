import 'dotenv/config';
import mongoose from 'mongoose';
import * as path from 'path';
import { createSchema, removeSchema } from '../../utils/schemaManager';

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

module.exports = {
    async up() {
        try {
            const dirname = path.dirname(__filename);
            const filename = path.basename(__filename);
            const ways = ['Dispensa', 'Licitação', 'Dispensa por Inexigibilidade'];
            await mongoose.connect(process.env.dbURI as string);
            const wayModel = mongoose.model<IAcquisitionWay>('acquisitionway', acquisitionWaySchema);
            await wayModel.createCollection();
            await wayModel.createIndexes();

            ways.forEach(async (way) => await wayModel.create({ name: way }));
            await createSchema(path.join(dirname, filename), path.join(dirname, '..', 'models', 'schemas', 'acquisitionWaySchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },

    async down() {
        try {
            const dirname = path.dirname(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const wayModel = mongoose.model<IAcquisitionWay>('acquisitionway', acquisitionWaySchema);
            await wayModel.collection.drop();
            await removeSchema(path.join(dirname, '..', 'models', 'schemas', 'acquisitionWaySchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },
};
