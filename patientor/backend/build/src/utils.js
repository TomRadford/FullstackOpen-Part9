"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = exports.assertNever = void 0;
const types_1 = require("../src/types");
// Generic utils
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.assertNever = assertNever;
//type gaurds
const isString = (text) => {
    return (typeof text === 'string' || text instanceof String);
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isEntry = (param: any): param is Entry => {
//   return (Array.isArray(param));
// };
//parsers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseName = (name) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDateOfBirth = (dob) => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return dob;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or mssing SSN');
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing Gender');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing Occupation');
    }
    return occupation;
};
//params could also be any here instead of fields
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    return {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };
};
exports.toNewPatient = toNewPatient;
//Entry type gaurds
const isDiagnosesCode = (param) => {
    return (Boolean(param[0].match(/[a-z]/i)) && Boolean(parseInt(param.slice(1))));
};
const isDiagnosesCodes = (arr) => {
    return (Array.isArray(arr) && arr.every(item => isString(item) &&
        isDiagnosesCode(item)));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (rating) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return (Object.values(types_1.HealthCheckRating).includes(rating));
};
// const isCheckType = (checkType: any): checkType is 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital' => {
//   return (['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(checkType));
// };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave) => {
    return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isDate(sickLeave.startDate) && isDate(sickLeave.endDate));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge) => {
    return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isDate(discharge.date) && isString(discharge.criteria));
};
//Entry Parsers
// const parseType = (type: unknown): 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital' => {
//   if (!type || !isString(type) || !isCheckType(type)) {
//     throw new Error('Incorrect or missing entry type');
//   }
//   return type;
// };
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Description Missing or malformatted');
    }
    return description;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Date missing or malformatted');
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Specialist missing or malformatted');
    }
    return specialist;
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!diagnosisCodes || !isDiagnosesCodes(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnoses codes');
    }
    return diagnosisCodes;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing health check rating');
    }
    return healthCheckRating;
};
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employer name');
    }
    return employerName;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        throw new Error('Incorrect or missing sick leave');
    }
    return sickLeave;
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge');
    }
    return discharge;
};
const toNewEntry = ({ type, description, date, specialist, diagnosisCodes, healthCheckRating, employerName, sickLeave, discharge }) => {
    const baseEntries = {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: diagnosisCodes ? parseDiagnosisCodes(diagnosisCodes) : undefined,
    };
    switch (type) {
        case 'HealthCheck': {
            return Object.assign(Object.assign({}, baseEntries), { type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(healthCheckRating) });
        }
        case 'OccupationalHealthcare': {
            return Object.assign(Object.assign({}, baseEntries), { type: 'OccupationalHealthcare', employerName: parseEmployerName(employerName), sickLeave: sickLeave ? parseSickLeave(sickLeave) : undefined });
        }
        case 'Hospital': {
            return Object.assign(Object.assign({}, baseEntries), { type: 'Hospital', discharge: parseDischarge(discharge) });
        }
        default: {
            throw new Error('Check type incorrect');
        }
    }
};
exports.toNewEntry = toNewEntry;
