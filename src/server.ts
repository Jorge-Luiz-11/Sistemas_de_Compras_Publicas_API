import 'dotenv/config';
import load from './loader';

const port: string = process.env.PORT as string;
const host: string = process.env.HOST as string;
const dburi: string = process.env.dbURI as string;

load(port, host, dburi);
