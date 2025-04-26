import express from 'express';
import messagesController from '../controllers/MessagesController';
import loginValidation from '../middlewares/loginValidation';

const route = express.Router();

route.get('/', loginValidation, messagesController.index);
route.get('/message', loginValidation, messagesController.show);
route.post('/', loginValidation, messagesController.store);
route.delete('/', loginValidation, messagesController.delete);

export default route;
