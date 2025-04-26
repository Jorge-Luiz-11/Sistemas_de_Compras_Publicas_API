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
