const axios = require('axios')
const helpers = require('../helpers')
const {DADATA_TOKEN} = require('../config')

module.exports.address = async (req, res) => {
	if (req.user.admin || req.user.restaurateur) {
		try {
			const addresses = await axios({
				method: 'POST',
				url: `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`,
				headers: {
					ContentType: 'application/json',
					Accept: 'application/json',
					Authorization: `Token ${DADATA_TOKEN}`,
				},
				data: {
					query: req.body.address,
					locations: [{country: '*'}],
				},
			})
			res.status(200).json(addresses.data)
		} catch (error) {
			console.log({error})
			helpers.errorHandler(res, error)
		}
	} else {
		helpers.clientErrorHandler(res, 400, errorText.ERROR_2)
	}
}
