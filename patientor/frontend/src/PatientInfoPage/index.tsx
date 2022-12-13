// import React from "react";
// import axios from "axios";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

// import { Patient } from "../types";
// import { apiBaseUrl } from "../constants";
// import { useStateValue } from "../state";
import {useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { isString } from "../utils";

const PatientInfoPage = () => {
  const {id} = useParams<{id: string}>();
  const [{patients}, dispatch] = useStateValue();
  const [error, setError] = useState<string | undefined>(undefined);
  console.log(patients);
  useEffect(() => {
    const fetchPatient = async () => {
    if (isString(id)) {
      if (!Object.keys(patients).find(patientId => patientId === id)) {
        console.log('Loading patient into state');
        try {
          const {data: requestedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`); 
          dispatch({type: "UPDATE_PATIENT", payload: requestedPatient});
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecgonized axios error");
            setError(String(e?.response?.data) || "Unrecignized axios error");
          } else {
            console.error("Unkown error", e);
            setError("Unkown error");
          }
        } 
      }}};
     void fetchPatient();
    }, []);

if (error) {
  return (
<div>
  <Typography variant="h3">{error}</Typography>
  </div>
  );
}


if (isString(id) && patients[id]) {
  const getGender = ():string => {
    switch (patients[id].gender) {
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
    <Typography variant="h5">{patients[id].name} {getGender()}</Typography>
    {
     patients[id].ssn ? 
     <p>ssn: {patients[id].ssn}</p> : null
    }
    <p>occupation: {patients[id].occupation}</p>
  
</div>
  );
}

return <div>Loading</div>;
  

};

export default PatientInfoPage;