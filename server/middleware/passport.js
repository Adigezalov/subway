const mongoose = require('mongoose')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = mongoose.model('users')
const keys = require('../config')

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.JWT_SECRET_KEY,
}

module.exports = passport => {
	passport.use(
		new JwtStrategy(options, async (payload, done) => {
			try {
				const user = await User.findById(payload.userId).select('email id admin restaurateur')
				if (user) {
					done(null, user)
				} else {
					done(null, false)
				}
			} catch (error) {
				console.log({error})
			}
		})
	)
}
