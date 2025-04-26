import express from 'express';
import messageArchivedsController from '../controllers/MessageArchivedsController';
import loginValidation from '../middlewares/loginValidation';

const route = express.Router();

route.get('/', loginValidation, messageArchivedsController.index);
route.get('/message', loginValidation, messageArchivedsController.show);
route.post('/', loginValidation, messageArchivedsController.store);
route.delete('/', loginValidation, messageArchivedsController.delete);

export default route;
