import express, { Application } from 'express';
import cors from 'cors';
import corsOptions from './config/cors';
import token from './routes/tokenRoute';
import login from './routes/loginRoute';
import years from './routes/yearsRoute';
import users from './routes/usersRoute';
import sections from './routes/sectionsRoute';
import processes from './routes/processesRoute';
import processStates from './routes/processStatesRoute';
import files from './routes/filesRoute';
import messages from './routes/messagesRoute';
import messageSents from './routes/messageSentsRoute';
import messageArchiveds from './routes/messageArchivedsRoute';
import acquisitionWays from './routes/acquisitionWaysRoute';
import fileBuffer from './routes/fileBufferRoute';

class App {
    app: Application;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use('/', login);
        this.app.use('/token', token);
        this.app.use('/years', years);
        this.app.use('/users', users);
        this.app.use('/sections', sections);
        this.app.use('/processes', processes);
        this.app.use('/processStates', processStates);
        this.app.use('/files', files);
        this.app.use('/messages', messages);
        this.app.use('/messageSents', messageSents);
        this.app.use('/messageArchiveds', messageArchiveds);
        this.app.use('/acquisitionWays', acquisitionWays);
        this.app.use('/fileBuffer', fileBuffer);
    }
}

export default new App().app;
