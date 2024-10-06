
import express from 'express';
import  authService  from '../services/authService.js';
const router = express.Router();

   

router.post('/signUp', authService.createUser);
router.get('/login',authService.login)
export default router;