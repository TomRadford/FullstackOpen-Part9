import React, { useEffect, useState } from "react";
import { getDiagnoses, useStateValue } from "../state";
import { Entry, Diagnosis, OccupationalHealthcareEntry, HealthCheckEntry, HospitalEntry } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { assertNever } from "../utils";
import { Work } from "@material-ui/icons";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Skeleton } from "@mui/material";

const Border = ({ children }: { children: React.ReactNode }) => <div style={{ borderRadius: '5px', borderStyle: 'solid', padding: '2px 10px 2px 10px', margin: '18px' }}>{children}</div>;

const OccupationalHealthcareEntryComponent = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  const [{ diagnoses }] = useStateValue();
  return (<Border>
    <p>{entry.date} <Work /> {entry.employerName}</p>
    <p>{entry.description}</p>
    <p>Diagnosed by {entry.specialist}</p>
    <strong>Diagnoses:</strong>
    <ul>
      {entry.diagnosisCodes?.map(code =>
        <li key={code}>{code} {diagnoses[code].name}</li>
      )}
    </ul>
    {entry.sickLeave ?
      <>
        <strong>Sick Leave:</strong>
        <ul>
          <li>Start Date: {entry.sickLeave.startDate}</li>
          <li>End Date: {entry.sickLeave.endDate}</li>
        </ul>
      </>
      : undefined}
  </Border>
  );
};

const HealthCheckEntryComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue();
  const getColor = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        break;
    }
  };
  return (
    <Border>
      <p>{entry.date} <MedicalServicesIcon /></p>
      <p>{entry.description}</p>
      <p>Diagnosed by {entry.specialist}</p>
      <FavoriteIcon htmlColor={getColor()} />
      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>{code} {diagnoses[code].name}</li>
        )}
      </ul>
    </Border>
  );
};

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Border>
      <p>{entry.date} <LocalHospitalIcon /></p>
      <p>{entry.description}</p>
      <p>Diagnosed by {entry.specialist}</p>
      <p><strong>Diagnoses:</strong></p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>{code} {diagnoses[code].name}</li>
        ))}
      </ul>
      <p><strong>Discharged:</strong></p>
      <ul>
        <li>At: {entry.discharge.date}</li>
        <li>Critera: {entry.discharge.criteria}</li>
      </ul>
    </Border>);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  const [error, setError] = useState<string | undefined>();
  useEffect(() => {
    const fetchDiagnoses = async () => {
      if (Object.keys(diagnoses).length === 0) {
        console.log('Loading all diagnoses into state');
        try {
          const { data: diagnosesData } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
          dispatch(getDiagnoses(diagnosesData));
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || 'Unrecognised axios error');
            setError(String(e?.response?.data || 'Unrecognised axios error'));
          } else {
            console.error("Unknown error", e);
            setError('Unkown error');
          }
        }
      }
    };
    void fetchDiagnoses();
  }, []);

  if (error) {
    return <>{error}</>;
  }

  if (Object.keys(diagnoses).length > 0) {
    switch (entry.type) {
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryComponent entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryComponent entry={entry} />;
      case "Hospital":
        return <HospitalEntryComponent entry={entry} />;
      default:
        assertNever(entry);
    }
  }

  return (<Skeleton variant="rectangular" width={500} height={100} />);
};

export default EntryDetails;