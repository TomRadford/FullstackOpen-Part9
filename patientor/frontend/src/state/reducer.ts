import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  {
   type: "GET_DIAGNOSES";
      payload: Diagnosis[]
  }  
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "GET_PATIENT_DETAILS";
    payload: Patient 
  
} ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case "ADD_PATIENT":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
          }
        };
      case "GET_PATIENT_DETAILS": 
        return {
          ...state,
          patientDetails: {
            ...Object.fromEntries(Object.entries(state.patientDetails).filter(([key]) => key !== action.payload.id)),
            [action.payload.id]: action.payload
        }};
      case "GET_DIAGNOSES": 
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({
                ...memo,
                [diagnosis.code]: diagnosis
              })
              , {})
          }
        };
    default:
      return state;
  }
};

//Action creators
export const addPatient = (newPatient:Patient):Action => {
  return { type: "ADD_PATIENT", payload: newPatient };
};

export const setPatientList = (patientList: Patient[]):Action => {
  return { type: "SET_PATIENT_LIST", payload: patientList };
};

export const getPatientDetails = (patientDetails: Patient):Action => {
  return { type: "GET_PATIENT_DETAILS", payload: patientDetails};
};

export const getDiagnoses = (diagnosesData: Diagnosis[]):Action => {
  return { type: "GET_DIAGNOSES", payload: diagnosesData};
};

