import express  from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {  
  res.json(patientsService.getNonSensitivePatients());});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatient = toNewPatient(req.body);
  } catch (e) {
    let errorMessage = 'Something went wrong. ';
    if (e instanceof Error) {
      errorMessage += e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
