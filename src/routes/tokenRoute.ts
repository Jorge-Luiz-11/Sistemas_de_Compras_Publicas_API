import express from 'express';
import tokenController from '../controllers/TokenController';

const route = express.Router();

route.post('/', tokenController.store);

export default route;
