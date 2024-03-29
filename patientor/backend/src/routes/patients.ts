import express from 'express';
import patientsService from '../services/patientsService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientsService.getPatient(id);
  if (typeof patient === 'undefined') {
    return res.sendStatus(404);
  }
  return res.json(patient);
});

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
    res.status(400).send({ error: errorMessage });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addPatientEntry(id, newEntry);
    res.send(addedEntry);
  } catch (e) {
    let errorMessage = 'Something went wrong. ';
    if (e instanceof Error) {
      errorMessage += e.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

export default router;
