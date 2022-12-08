import express from 'express';
import dianosesService from '../services/diagnosesService';
const router = express.Router();


router.get('/', (_req, res) => {
	res.send(dianosesService.getDiagnoses());
});

export default router;