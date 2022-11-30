interface InputValues {
	days: Array<number>,
	target: number
}

const parseArguments = (args: Array<string>): InputValues => {
	if (args.length < 5) {
		throw new Error('Please enter two or more days with hours of exercise followed by target average.')
	}
	let output: InputValues = {
		days: [],
		target: Number(args[2])
	}

	args.slice(3).map((arg, i) => {
		if (isNaN(Number(arg))) {
			throw new Error(`${arg} is not a number`)
		} else {
			if (i !== args.length - 2) {
				output.days = [...output.days, Number(arg)]
			}
		}
	})
	return output
}

interface ExerciseResults {
	periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: 1 | 2 | 3,
	ratingDescription: String,
	target: number,
	average: number
}

const calculateExercises = (days: Array<number>, target: number): ExerciseResults => {
	const average = days.reduce((p, c) => p + c, 0) / days.length;
	const rating = average < 1 ? 1 : average < 2 ? 2 : 3;
	return {
		periodLength: days.length,
		trainingDays: days.filter(day => day > 0).length,
		success: target >= average,
		rating: rating,
		ratingDescription: rating === 1 ? 'not great, try exercise more'
			: rating === 2 ? 'not bad, but could be better' : 'great, you exercise a lot every day',
		target: target,
		average: average,
	}
}

try {
	const { days, target } = parseArguments(process.argv)
	console.log(calculateExercises(days, target))
} catch (e) {
	let errorMessage: string = 'Something bad happened.'
	if (e instanceof Error) {
		errorMessage += ' ' + e.message
	}
	console.log(errorMessage)
}

//Tell TS that this is module scope 
export { }