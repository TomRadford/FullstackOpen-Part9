import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddEntryModal from "../AddEntryModal";
import { apiBaseUrl } from "../constants";
import { addPatientEntry, getPatientDetails, useStateValue } from "../state";
import { Entry, NewEntry, Patient } from "../types";
import { isString } from "../utils";
import EntryDetails from "./EntryDetails";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails }, dispatch] = useStateValue();
  const [error, setError] = useState<string | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      if (values.type === "OccupationalHealthcare") {
        if (values.sickLeave?.endDate === "" && values.sickLeave.endDate === "") {
          values.sickLeave = undefined;
        }
      }

      const { data: newEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${String(id)}/entries`, values);
      dispatch(addPatientEntry({ entry: newEntry, patientId: String(id) }));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unreccognised axios error");
        setError(String(e?.response?.data?.error) || "Unrecognised axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };


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
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
          New Entry
        </Button>
      </div>
    );
  }

  return <div>Loading</div>;


};

export default PatientInfoPage;