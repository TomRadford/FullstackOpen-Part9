"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(patientsService_1.default.getNonSensitivePatients());
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient = patientsService_1.default.getPatient(id);
    if (typeof patient === 'undefined') {
        return res.sendStatus(404);
    }
    return res.json(patient);
});
router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patientsService_1.default.addPatient(newPatient);
        res.send(addedPatient);
    }
    catch (e) {
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
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const addedEntry = patientsService_1.default.addPatientEntry(id, newEntry);
        res.send(addedEntry);
    }
    catch (e) {
        let errorMessage = 'Something went wrong. ';
        if (e instanceof Error) {
            errorMessage += e.message;
        }
        res.status(400).send({ error: errorMessage });
    }
});
exports.default = router;
