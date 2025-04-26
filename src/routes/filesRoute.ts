import express from 'express';
import filesController from '../controllers/FilesController';
import loginValidation from '../middlewares/loginValidation';

const route = express.Router();

route.get('/', loginValidation, filesController.index);
route.get('/file', loginValidation, filesController.show);
route.post('/', loginValidation, filesController.store);
route.put('/', loginValidation, filesController.update);
route.delete('/', loginValidation, filesController.delete);

export default route;
