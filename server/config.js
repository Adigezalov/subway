require('dotenv').config()

module.exports = {
	MONGO_URL: process.env.MONGO_URL,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
	YANDEX_GEOCODER_TOKEN: process.env.YANDEX_GEOCODER_TOKEN,
	DADATA_TOKEN: process.env.DADATA_TOKEN,
	TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
	PORT: process.env.APP_PORT,
	IP: process.env.APP_IP,
}
