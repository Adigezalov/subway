const mongoose = require('mongoose')
const keys = require('./config')
const app = require('./app')

mongoose
	.connect(keys.MONGO_URL, {
		useNewUrlParser: true,
	})
	.then(() => {
		app.listen(keys.PORT, () => console.log(`Server started on port ${keys.PORT}`))
		console.log('Connected to MongoDB')
	})
	.catch(error => console.log(error))
