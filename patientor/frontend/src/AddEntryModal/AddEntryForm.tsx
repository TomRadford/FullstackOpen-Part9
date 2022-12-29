import { Grid, Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { TextField, DiagnosisSelection, TypeSelectField, HealthCheckRatingField } from "../FormField";
// import { DiagnosisSelection, NumberField, TypeSelectField } from "../FormField";
import { useStateValue } from "../state";
import { NewEntry } from "../types";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <>
      <Formik
        initialValues={{
          type: "HealthCheck",
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: [],
          healthCheckRating: 0
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
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
          if (!values.specialist) {
            errors.specialist = requiredError;
          }

          console.log(errors);
          return errors;
        }}
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
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Name of Specialist"
                name="specialist"
                component={TextField}
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
              {() => {
                if (values.type === "OccupationalHealthcare") {
                  values.employerName = "";
                  values.sickLeave = {
                    startDate: "",
                    endDate: ""
                  };
                  return <>
                    lol
                    <Field
                      label="Employer Name"
                      placeholder="Employer Name"
                      name="employerName"
                      component={TextField}
                    />
                  </>;
                }

              }}
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