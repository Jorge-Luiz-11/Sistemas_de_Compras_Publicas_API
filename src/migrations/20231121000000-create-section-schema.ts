import 'dotenv/config';
import * as path from 'path';
import { createSchema, removeSchema } from '../../utils/schemaManager';

//This file must be edited directly by migration.
import mongoose, { Schema, Types } from 'mongoose';

export interface ISection {
    _id?: string | Types.ObjectId;
    name: string;
    level: number;
}

async function nameValidator(value: string): Promise<boolean> {
    try {
        const user: ISection | null = await mongoose.model('section').findOne({ name: value });
        if (user) {
            return false;
        }
        return true;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const sectionSchema = new Schema<ISection>({
    name: {
        type: String,
        required: [true, 'Nome é um campo obrigatório!'],
        unique: true,
        validate: {
            validator: nameValidator,
            message: 'Este nome já possuí cadastro!',
        },
    },
    level: {
        type: Number,
        required: [true, 'Level é um campo obrigatório!'],
    },
});

//End

module.exports = {
    async up() {
        try {
            const dirname = path.dirname(__filename);
            const filename = path.basename(__filename);
            const level1 = ['Transporte', 'Recursos Humanos', 'Administrativo', 'Comunicações', 'Almoxarifado', 'Informática'];
            const level2 = ['Fiscal', 'Ordenador de Despesas', 'Seção de Orçamentos', 'Pregoeiro'];
            const level10 = ['ADM'];

            await mongoose.connect(process.env.dbURI as string);
            const sectionModel = mongoose.model<ISection>('section', sectionSchema);
            await sectionModel.createCollection();
            await sectionModel.createIndexes();

            level1.forEach(async (section) => await sectionModel.create({ name: section, level: '1' }));
            level2.forEach(async (section) => await sectionModel.create({ name: section, level: '2' }));
            level10.forEach(async (section) => await sectionModel.create({ name: section, level: '10' }));
            await createSchema(path.join(dirname, filename), path.join(dirname, '..', 'models', 'schemas', 'sectionSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },

    async down() {
        try {
            const dirname = path.dirname(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const sectionModel = mongoose.model<ISection>('section', sectionSchema);
            await sectionModel.collection.drop();
            await removeSchema(path.join(dirname, '..', 'models', 'schemas', 'sectionSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },
};
