// https://nodejs.org/api/readline.html
const readline = require('readline')


function ask_question(question) {
	return new Promise((resolve, reject) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		})

		rl.question(question + '\n', answer => {
			console.log(`[You entered: "${answer}"]`)
			rl.close()
			resolve(answer)
		})
	})
}


module.exports = {
	ask_question,
}
