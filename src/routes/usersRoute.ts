import express from 'express';
import userController from '../controllers/UsersController';
import loginValidation from '../middlewares/loginValidation';

const route = express.Router();

route.get('/', loginValidation, userController.index);
route.get('/user', loginValidation, userController.show);
route.post('/', userController.store);
route.put('/', loginValidation, userController.update);
route.delete('/', loginValidation, userController.delete);

export default route;
