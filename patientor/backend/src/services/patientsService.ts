import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id, name, dateOfBirth, gender, occupation
    };
  });
};

const addPatient = (patient:NewPatient):Patient => {
  const id = uuid();
  const newPatient = {
    ...patient,
    id: id
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient
};