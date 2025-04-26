import express from 'express';
import processesController from '../controllers/ProcessesController';
import loginValidation from '../middlewares/loginValidation';

const route = express.Router();

route.get('/', loginValidation, processesController.index);
route.get('/process', loginValidation, processesController.show);
route.post('/', loginValidation, processesController.store);
route.put('/', loginValidation, processesController.update);
route.delete('/', loginValidation, processesController.delete);

export default route;
