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
import { getPatientDetails, useStateValue } from "../state";
import { Patient } from "../types";
import { isString } from "../utils";

const PatientInfoPage = () => {
  const {id} = useParams<{id: string}>();
  const [{patientDetails}, dispatch] = useStateValue();
  const [error, setError] = useState<string | undefined>(undefined);
  console.log(patientDetails);
  useEffect(() => {
    const fetchPatient = async () => {
    if (isString(id)) {
      if (!Object.keys(patientDetails).find(patientId => patientId === id)) {
        console.log('Loading new patient into patientDetails state');
        try {
          const {data: requestedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`); 
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


if (isString(id) && patientDetails[id]) {
  const getGender = ():string => {
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
  
</div>
  );
}

return <div>Loading</div>;
  

};

export default PatientInfoPage;