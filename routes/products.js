import express from 'express';
import * as productController from '../controller/productController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', adminAuth, productController.create);
router.put('/:id', adminAuth, productController.update);
router.delete('/:id', adminAuth, productController.remove);

export default router;
