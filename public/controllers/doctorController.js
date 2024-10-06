import doctor from '../models/doctor.js';
import docService from '../services/doctorService.js'
import express from 'express';
const router = express.Router();
console.log('im in doctor controller')
router.get('/getDocList',docService.getDocList)
router.post('/updateProfile',docService.updateProfile)


export default router;