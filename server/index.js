const mongoose = require('mongoose')
const {IP, MONGO_URL, PORT} = require('./config')
const app = require('./app')
const bot = require('./bot/bot')

mongoose
	.connect(MONGO_URL, {
		useNewUrlParser: true,
	})
	.then(() => {
		app.listen(PORT, IP, err, () => {
			console.log(`Server started on ${IP} port ${PORT}`)
			bot.launch()
		})

		function err(error) {
			console.log(error)
		}

		console.log('Connected to MongoDB')
	})
	.catch(error => console.log(error))
