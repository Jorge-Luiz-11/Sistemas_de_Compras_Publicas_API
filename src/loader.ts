import app from './app';
import dbConnect from './config/database';

export default async function load(PORT: string, HOST: string, dbURI: string): Promise<void> {
    try {
        if (PORT && HOST && dbURI) {
            const port: number = parseInt(PORT, 10);
            await dbConnect(dbURI);
            app.listen(port, HOST, () => {
                console.log(`server running on http://${HOST}:${port}`);
            });
        } else {
            console.log('connection failed: values are not strings');
        }
    } catch (error) {
        throw new Error(error as string);
    }
}
