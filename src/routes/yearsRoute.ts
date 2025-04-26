import express from 'express';
import YearsController from '../controllers/YearsController';
import loginValidation from '../middlewares/loginValidation';

const router = express.Router();

router.post('/', loginValidation, YearsController.store);
router.get('/', loginValidation, YearsController.index);
router.get('/year', loginValidation, YearsController.show);
router.put('/', loginValidation, YearsController.update);
router.delete('/', loginValidation, YearsController.delete);

export default router;
