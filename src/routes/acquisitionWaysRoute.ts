import express from 'express';
import AcquisitionWaysController from '../controllers/AcquisitionWaysController';
import loginValidation from '../middlewares/loginValidation';

const route = express.Router();

route.get('/', loginValidation, AcquisitionWaysController.index);
route.get('/acquisitionWay', loginValidation, AcquisitionWaysController.show);
route.post('/', loginValidation, AcquisitionWaysController.store);
route.put('/', loginValidation, AcquisitionWaysController.update);
route.delete('/', loginValidation, AcquisitionWaysController.delete);

export default route;
