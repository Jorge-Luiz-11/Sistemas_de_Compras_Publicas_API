import 'dotenv/config';

const whitelist: string[] = (process.env.ORIGIN as string).split(',');

const corsOptions = {
    origin: whitelist,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Disposition', 'content-disposition'],
    credentials: true,
};

export default corsOptions;
