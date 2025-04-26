import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

export default async function dbConnect(dbURI: string): Promise<void> {
    try {
        await mongoose.connect(dbURI);
        console.log('database connected');
    } catch (error) {
        throw new Error(error as string);
    }
}
