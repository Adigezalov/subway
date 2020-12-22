module.exports = {
	errorHandler(res, error) {
		res.status(500).json({success: false, error: error.message ? error.message : error})
	},

	clientErrorHandler(res, status, error) {
		res.status(status).json({
			error: error,
		})
	},
}
