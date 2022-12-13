import { Gender, NewPatient } from '../src/types';

//type gaurds
const isString = (text: unknown): text is string => {
  return (typeof text === 'string' || text instanceof String); 
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isEntry = (param: any): param is Entry => {
//   return (Array.isArray(param));
// };

//parsers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseName = (name: any): string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (dob: unknown): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return dob;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or mssing SSN');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing Gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing Occupation');
  }
  return occupation;
};

// const parseEntries = (entries: unknown): Entry[] => {
//   if (!isEntry(entries)) {
//     throw new Error('Incorrect or missing array');
//   }
//   if (!entries) {
//     return [];
//   }
//   return entries;
// };

type Fields = {
name: unknown,
dateOfBirth: unknown,
ssn: unknown,
gender: unknown,
occupation: unknown,
entries?: unknown
}
//params could also be any here instead of fields
export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}:Fields): NewPatient => {
  return {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
};

