import express  from 'express';
import patientsService from '../services/patientsService';
import {toNewPatient} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {  
  res.json(patientsService.getNonSensitivePatients());});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (e) {
    let errorMessage = 'Something went wrong. ';
    if (e instanceof Error) {
      errorMessage += e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
