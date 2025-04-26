import express from 'express';
import messageSentsControler from '../controllers/MessageSentsControler';
import loginValidation from '../middlewares/loginValidation';

const route = express.Router();

route.get('/', loginValidation, messageSentsControler.index);
route.get('/message', loginValidation, messageSentsControler.show);
route.delete('/', loginValidation, messageSentsControler.delete);

export default route;
