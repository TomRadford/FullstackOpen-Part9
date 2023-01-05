import { Gender, NewPatient, NewEntry, BaseEntry, Diagnosis, HealthCheckRating, SickLeave, Discharge } from '../src/types';

// Generic utils
export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

//type gaurds
export const isString = (text: unknown): text is string => {
  return (typeof text === 'string' || text instanceof String);
};


export const isDate = (date: string): boolean => {
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

type PatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries?: unknown
};
//params could also be any here instead of fields
export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient => {
  return {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
};

//Entry type gaurds
const isDiagnosesCode = (param: string): param is Diagnosis['code'] => { //asumme string check
  return (Boolean(param[0].match(/[a-z]/i)) && Boolean(parseInt(param.slice(1))));
};

const isDiagnosesCodes = (arr: unknown): arr is Array<Diagnosis['code']> => {
  return (Array.isArray(arr) && arr.every(item =>
    isString(item) &&
    isDiagnosesCode(item)
  ));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return (Object.values(HealthCheckRating).includes(rating));
};

// const isCheckType = (checkType: any): checkType is 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital' => {
//   return (['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(checkType));
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isDate(sickLeave.startDate) && isDate(sickLeave.endDate)
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): discharge is Discharge => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isDate(discharge.date) && isString(discharge.criteria)
  );
};


//Entry Parsers
// const parseType = (type: unknown): 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital' => {
//   if (!type || !isString(type) || !isCheckType(type)) {
//     throw new Error('Incorrect or missing entry type');
//   }
//   return type;
// };

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Description Missing or malformatted');
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Date missing or malformatted');
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Specialist missing or malformatted');
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !isDiagnosesCodes(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnoses codes');
  }
  return diagnosisCodes;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }
  return sickLeave;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

interface NewEntryFields {
  type: unknown,
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  healthCheckRating?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  discharge: unknown;
}

// interface HealthEntryFields extends BaseEntryFields {
//   healthCheckRating: unknown;
// }

// interface OccupationalHealthcareEntryFields extends BaseEntryFields {
//   employerName: unknown;
//   sickLeave?: unknown;
// }

// interface HospitalEntryFields extends BaseEntry {
//   discharge: unknown;
// }

// type NewEntryFields = HealthEntryFields | OccupationalHealthcareEntryFields | HospitalEntryFields

type BaseNewEntry = Omit<BaseEntry, 'id'>;

export const toNewEntry = ({ type, description, date, specialist, diagnosisCodes,
  healthCheckRating, employerName, sickLeave, discharge }: NewEntryFields): NewEntry => {
  const baseEntries: BaseNewEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: diagnosisCodes ? parseDiagnosisCodes(diagnosisCodes) : undefined,
  };

  switch (type) {
    case 'HealthCheck': {
      return { ...baseEntries, type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(healthCheckRating) };
    }
    case 'OccupationalHealthcare': {
      return {
        ...baseEntries,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(employerName),
        sickLeave: sickLeave ? parseSickLeave(sickLeave) : undefined
      };
    }
    case 'Hospital': {
      return {
        ...baseEntries,
        type: 'Hospital',
        discharge: parseDischarge(discharge)
      };
    }
    default: {
      throw new Error('Check type incorrect');
    }
  }
};


