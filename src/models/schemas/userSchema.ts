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
