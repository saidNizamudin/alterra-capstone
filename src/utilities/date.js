import moment from 'moment';

export function dateToTimestamp(dateString) {
	const momentObj = moment(dateString);
	const timestamp = momentObj.valueOf();
	return timestamp;
}

export function convertToDate(date, time) {
	const momentObj = moment(date);
	const formattedDate = momentObj.format('DD MMMM YYYY');
	return time + ' | ' + formattedDate;
}
