import patients from '../../data/patients';
import { Entry, NewPatient, NonSensitivePatient, Patient, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

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

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    ...patient,
    id: id
  };
  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (patientId: string, entry: NewEntry): Entry => {
  const patientIndex = patients.findIndex(patient => patient.id === patientId);
  if (patientIndex === -1) {
    throw new Error('Patient not found');
  }
  const id = uuid();
  const newEntry: Entry = {
    id: id,
    ...entry
  };
  patients[patientIndex].entries?.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  getNonSensitivePatients,
  addPatient,
  addPatientEntry
};