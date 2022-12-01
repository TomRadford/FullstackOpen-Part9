import express from "express";
import { calculateBmi } from "./bmiCalculator";
import bodyParser from "body-parser";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weight: inputWeight, height: inputHeight } = req.query;
  const height = Number(inputHeight);
  const weight = Number(inputWeight);
  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  } else {
    return res.json({
      height,
      weight,
      bmi: calculateBmi(height, weight),
    });
  }
});

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(req.body.target);
  if (isNaN(target)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }
  let days: Array<number> = [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  req.body.daily_exercises.map((day: number) => {
    if (isNaN(Number(day))) {
      return res.status(400).json({
        error: "malformatted parameters",
      });
    }
    return (days = [...days, Number(day)]);
  });
  return res.json(calculateExercises(days, target));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
