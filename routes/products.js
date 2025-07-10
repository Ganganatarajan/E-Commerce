import express from 'express';
import * as productController from '../controller/productController.js';
import { adminAuth } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();


router.get('/', productController.getAll);
router.get('/:id', productController.getById);

router.post('/', upload.single('image'), productController.create);
router.put('/:id', upload.single('image'), productController.update);
router.delete('/:id', adminAuth, productController.remove);

export default router;

