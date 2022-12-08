import patients from '../../data/patients';
import { NonSensitivePatient, Patient } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id, name, dateOfBirth, gender, occupation
    };
  });
};

export default {
  getPatients,
  getNonSensitivePatients
};