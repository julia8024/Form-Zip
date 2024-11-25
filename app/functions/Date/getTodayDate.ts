export default function getTodayDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;  // 월은 0부터 시작하므로 +1
	const day = today.getDate();

	return { year: year, month: month, day: day }
}

export function getTodayDateStr() {
	const todays = getTodayDate();

	const month = String(todays.month).padStart(2, "0");
	const day = String(todays.day).padStart(2, "0"); // 날짜가 한 자리일 경우 앞에 0 추가

	const defaultDate = `${todays.year}-${month}-${day}`;
	return defaultDate;
}