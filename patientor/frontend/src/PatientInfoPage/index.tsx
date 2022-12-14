import { Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { getPatientDetails, useStateValue } from "../state";
import { Patient } from "../types";
import { isString } from "../utils";
import EntryDetails from "./EntryDetails";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails }, dispatch] = useStateValue();
  const [error, setError] = useState<string | undefined>(undefined);
  console.log(patientDetails);
  useEffect(() => {
    const fetchPatient = async () => {
      if (isString(id)) {
        if (!Object.keys(patientDetails).find(patientId => patientId === id)) {
          console.log('Loading new patient into patientDetails state');
          try {
            const { data: requestedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch(getPatientDetails(requestedPatient));
          } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
              console.error(e?.response?.data || "Unrecgonized axios error");
              setError(String(e?.response?.data) || "Unrecignized axios error");
            } else {
              console.error("Unkown error", e);
              setError("Unkown error");
            }
          }
        }
      }
    };
    void fetchPatient();
  }, []);

  if (error) {
    return (
      <div>
        <Typography variant="h3">{error}</Typography>
      </div>
    );
  }


  if (isString(id) && patientDetails[id]) {
    const getGender = (): string => {
      switch (patientDetails[id].gender) {
        case "male":
          return '♂';
        case 'female':
          return '♀️';
        default:
          return '⚥';
      }
    };
    return (
      <div>
        <Typography variant="h5">{patientDetails[id].name} {getGender()}</Typography>
        {
          patientDetails[id].ssn ?
            <p>ssn: {patientDetails[id].ssn}</p> : null
        }
        <p>occupation: {patientDetails[id].occupation}</p>

        {patientDetails[id].entries?.map((entry, i) => {
          if (i === 0) return (
            <div key={entry.id}>
              <Typography variant="h3">Entries</Typography>
              <EntryDetails entry={entry} />
            </div>
          );
          return (
            <EntryDetails key={entry.id} entry={entry} />);
        }
        )}
      </div>
    );
  }

  return <div>Loading</div>;


};

export default PatientInfoPage;