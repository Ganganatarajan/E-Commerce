    import express from 'express';
    import { register, login, getCurrentUser } from '../controller/authController.js'
    import { registerValidator, loginValidator } from '../validators/authValidator.js';
    import { auth } from '../middleware/auth.js';

    const router = express.Router();

    router.post('/register', registerValidator, register);
    router.post('/login', loginValidator, login);
    router.get('/me', auth, getCurrentUser);

    export default router;