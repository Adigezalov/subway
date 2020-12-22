import moment from 'moment'

export function timeToTimestamp(time) {
	const setHours = time.split(':')[0]
	const setMinutes = time.split(':')[1]
	const nowHours = moment().format('HH')
	const nowMinutes = moment().format('mm')

	if (nowHours > setHours) {
		return false
	}
	if (nowHours < setHours) {
		return true
	}
	if (nowHours === setHours) {
		if (nowMinutes >= setMinutes) {
			return false
		} else {
			return true
		}
	}
}
