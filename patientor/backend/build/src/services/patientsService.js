"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getPatient = (id) => {
    return patients_1.default.find(patient => patient.id === id);
};
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return {
            id, name, dateOfBirth, gender, occupation
        };
    });
};
const addPatient = (patient) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign(Object.assign({}, patient), { id: id });
    patients_1.default.push(newPatient);
    return newPatient;
};
const addPatientEntry = (patientId, entry) => {
    var _a;
    const patientIndex = patients_1.default.findIndex(patient => patient.id === patientId);
    if (!patientIndex) {
        throw new Error('Patient not found');
    }
    const id = (0, uuid_1.v1)();
    const newEntry = Object.assign({ id: id }, entry);
    (_a = patients_1.default[patientIndex].entries) === null || _a === void 0 ? void 0 : _a.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatients,
    getPatient,
    getNonSensitivePatients,
    addPatient,
    addPatientEntry
};
