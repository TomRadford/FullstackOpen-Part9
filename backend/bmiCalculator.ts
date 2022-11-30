interface bmiValues {
	height: number,
	weight: number
}

const parseArguments = (args: Array<string>): bmiValues => {
	if (args.length < 4) throw new Error('Too many args');
	if (args.length > 4) throw new Error('Not enough args');
	if (!isNaN(Number(args[2])) && (!isNaN(Number(args[3])))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3])
		}
	} else throw new Error('Provided values aren\'t numbers!')
}

type Result = string

const calculateBmi = (height: number, weight: number): Result => {
	const bmi = weight / Math.pow(height / 100, 2)
	switch (true) {
		case bmi < 16: return 'Underweight (Severe thinness)';
		case (bmi >= 16 && bmi < 17): return 'Underweight (Moderate thinness)';
		case (bmi >= 17 && bmi < 18.4): return 'Underweight (Mild thinness)';
		case (bmi >= 18.4 && bmi < 25): return 'Normal (healthy weight)';
		case (bmi >= 25 && bmi < 30): return 'Overweight (Pre-obese)';
		case (bmi >= 30 && bmi < 35): return 'Obese (Class I)';
		case (bmi >= 35 && bmi < 40): return 'Obese (Class II)';
		case (bmi > 40): return 'Obese (Class III)';
		default:
			throw new Error('Height and weight values invalid.')
	}
}

try {
	const { height, weight } = parseArguments(process.argv);
	console.log(calculateBmi(height, weight));
} catch (e) {
	let errorMessage = 'An error occured.';
	if (e instanceof Error) {
		errorMessage += ' Error: ' + e.message
	}
	console.log(errorMessage);
}

export { calculateBmi }