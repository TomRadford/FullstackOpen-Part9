import { Grid, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField, DiagnosisSelection, TypeSelectField, HealthCheckRatingField } from "../FormField";
// import { DiagnosisSelection, NumberField, TypeSelectField } from "../FormField";
import { useStateValue } from "../state";
import { BaseEntry, NewEntry } from "../types";
import { isDate } from "../utils";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const sharedValues: Omit<BaseEntry, 'id'> = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
};

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <>
      <Formik
        initialValues={{
          ...sharedValues,
          type: "HealthCheck",
          healthCheckRating: 0
        }}
        validateOnChange //To run checks on any change, not only on submit
        // enableReinitialize //resets on change of initial valies
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          const incorrectError = "Incorrect format";
          const errors: { [field: string]: string } = {};
          if (!values.type) {
            errors.type = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (values.date && !isDate(values.date)) {
            errors.date = incorrectError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (values.type === "HealthCheck") {
            values = {
              ...sharedValues,
              type: "HealthCheck",
              healthCheckRating: 0
            };
          }
          if (values.type === "OccupationalHealthcare") {
            values = {
              ...sharedValues,
              type: "OccupationalHealthcare",
              employerName: values.employerName ? values.employerName : "",
              sickLeave: {
                startDate: values.sickLeave?.startDate ? values.sickLeave?.startDate : "",
                endDate: values.sickLeave?.endDate ? values.sickLeave?.endDate : ""
              }
            };
            if (values.sickLeave && !isDate(values.sickLeave.startDate)) {
              errors["sickLeave.startDate"] = incorrectError;
            }
            if (values.sickLeave && !isDate(values.sickLeave.endDate)) {
              errors["sickLeave.endDate"] = incorrectError;
            }
          }
          if (values.type === "Hospital") {
            values = {
              ...sharedValues,
              type: "Hospital",
              discharge: {
                date: values.discharge?.date ? values.discharge?.date : "",
                criteria: values.discharge?.criteria ? values.discharge?.criteria : ""
              }
            };

            if (!values.discharge.date) {
              errors["discharge.date"] = requiredError;
            }
            if (values.discharge.date && !isDate(values.discharge.date)) {
              errors["discharge.date"] = incorrectError;
              console.log(errors["discharge.date"]);
            }
          }

          console.log(errors);
          return errors;
        }
        }
      >

        {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
          console.log(values);
          return (
            <Form className="form ui">
              <TypeSelectField
                label="Type"
                name="type"
                options={['HealthCheck', 'OccupationalHealthcare', 'Hospital']}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
                required
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
                required
              />
              <Field
                label="Specialist"
                placeholder="Name of Specialist"
                name="specialist"
                component={TextField}
                required
              />
              <DiagnosisSelection
                setFieldTouched={setFieldTouched}
                setFieldValue={setFieldValue}
                diagnoses={Object.values(diagnoses)}
              />
              {values.type === 'HealthCheck' ?
                <HealthCheckRatingField
                  name="healthCheckRating"
                  label="Health Check rating"
                  options={['Healthy', 'LowRisk', 'HighRisk', 'CriticalRisk']}
                />
                : undefined}
              {values.type === "OccupationalHealthcare" ?
                <>
                  <Field
                    label="Employer Name"
                    placeholder="Employer Name"
                    name="employerName"
                    component={TextField}
                    required
                  />
                  <Field
                    label="Sick Leave: Start Date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.startDate"
                    component={TextField}
                  />
                  <Field
                    label="Sick Leave: End Date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
                    component={TextField}
                  />
                </> : undefined
              }
              {
                values.type === "Hospital" ?
                  <>
                    <Field
                      label="Discharge: Date"
                      placeholder="YYYY-MM-DD"
                      name="discharge.date"
                      component={TextField}
                      required
                    />
                    <Field
                      label="Discharge: Criteria"
                      placeholder="Discharge criteria"
                      name="discharge.criteria"
                      component={TextField}
                      required
                    />
                  </> : undefined
              }


              <Grid>
                <Grid item>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>

                </Grid>
                <Grid item>
                  <Button
                    style={{
                      float: "right",
                    }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>

            </Form>);
        }}

      </Formik>
    </>
  );
};

export default AddEntryForm;