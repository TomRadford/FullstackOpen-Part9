import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const { weight: inputWeight, height: inputHeight } = req.query
	const height = Number(inputHeight)
	const weight = Number(inputWeight)
	if (isNaN(height) || isNaN(weight)) {
		return res.status(400).json({
			error: 'malformatted parameters'
		})
	} else {
		return res.json({
			height,
			weight,
			bmi: calculateBmi(height, weight)
		})
	}

});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});