import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controller/userController.js';
import { adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', adminAuth, getAllUsers);
router.put('/:id', adminAuth, updateUser);
router.delete('/:id', adminAuth, deleteUser);

export default router;