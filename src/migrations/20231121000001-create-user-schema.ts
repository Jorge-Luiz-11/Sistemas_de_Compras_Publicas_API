import 'dotenv/config';
import bcrypt from 'bcryptjs';
import * as path from 'path';
import { createSchema, removeSchema } from '../../utils/schemaManager';
import { ISection } from '../models/schemas/sectionSchema';

//This file must be edited directly by migration.
import mongoose, { Schema, Types } from 'mongoose';

export interface IUser {
    _id?: string | Types.ObjectId;
    name: string;
    password: string;
    section: string | Types.ObjectId;
    level: number;
}

async function nameValidator(value: string): Promise<boolean> {
    try {
        const user: IUser | null = await mongoose.model('user').findOne({ name: value });
        if (user) {
            return false;
        }
        return true;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Nome é um campo obrigatório'],
        unique: true,
        validate: {
            validator: nameValidator,
            message: 'Este nome já possuí cadastro!',
        },
    },
    password: {
        type: String,
        required: [true, 'Senha é um campo obrigatório'],
    },
    section: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'section',
    },
    level: {
        type: Number,
        required: [true, 'Level é um campo obrigatório'],
        cast: 'Este Campo precisa ser preenchido por um numeral!',
    },
});

//End

module.exports = {
    async up() {
        try {
            const dirname = path.dirname(__filename);
            const filename = path.basename(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const userModel = mongoose.model<IUser>('user', userSchema);
            await userModel.createCollection();
            await userModel.createIndexes();

            const section = await mongoose.model<ISection>('section').findOne({ name: 'ADM' });

            if (section) {
                await userModel.create({
                    name: 'ADM',
                    password: await bcrypt.hash('123456', 10),
                    section: section._id as string,
                    level: 10,
                });
            } else {
                throw new Error('Error during user creation');
            }
            await createSchema(path.join(dirname, filename), path.join(dirname, '..', 'models', 'schemas', 'userSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },

    async down() {
        try {
            const dirname = path.dirname(__filename);
            await mongoose.connect(process.env.dbURI as string);
            const userModel = mongoose.model<IUser>('user', userSchema);
            await userModel.collection.drop();
            await removeSchema(path.join(dirname, '..', 'models', 'schemas', 'userSchema.ts'));
        } catch (error) {
            console.log(error);
        }
    },
};
