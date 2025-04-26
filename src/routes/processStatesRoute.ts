import express from 'express';
import processStatesController from '../controllers/ProcessStatesController';
import loginValidation from '../middlewares/loginValidation';

const route = express.Router();

route.get('/', loginValidation, processStatesController.index);
route.get('/processState', loginValidation, processStatesController.show);
route.post('/', loginValidation, processStatesController.store);
route.put('/', loginValidation, processStatesController.update);
route.delete('/', loginValidation, processStatesController.delete);

export default route;
