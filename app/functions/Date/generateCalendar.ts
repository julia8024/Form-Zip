// Calendar Generation Function
// year, month에 대한 날짜 반환
export default function generateCalendar(year: number, month: number) {
	const result = [];
	const currentDate = new Date(year, month - 1, 1);
	const daysInMonth = new Date(year, month, 0).getDate();
	const startDay = currentDate.getDay(); // The day of the week the month starts (0: Sunday, 1: Monday, ..., 6: Saturday)

	let date = 1 - startDay; // Start date of the first week
	for (let row = 0; row < 6; row++) {
		const week = [];
		for (let i = 0; i < 7; i++) {
			let currentMonth = month;
			let currentYear = year;

			// Adjust month and year for dates from previous or next month
			if (date <= 0) {
				currentMonth = month - 1;
				if (currentMonth === 0) {
					currentMonth = 12;
					currentYear = year - 1;
				}
				const prevMonthDays = new Date(year, month - 1, 0).getDate();
				const prevMonthDate = prevMonthDays + date;
				week.push({
					year: currentYear,
					month: currentMonth,
					day: prevMonthDate,
					isCurrentMonth: false,
					isToday: false,
				});
			} else if (date > daysInMonth) {
				currentMonth = month + 1;
				if (currentMonth === 13) {
					currentMonth = 1;
					currentYear = year + 1;
				}
				const nextMonthDate = date - daysInMonth;
				week.push({
					year: currentYear,
					month: currentMonth,
					day: nextMonthDate,
					isCurrentMonth: false,
					isToday: false,
				});
			} else {
				week.push({
					year: currentYear,
					month: currentMonth,
					day: date,
					isCurrentMonth: true,
					isToday: checkIsToday(currentYear, currentMonth, date),
				});
			}
			date++;
		}
		result.push(week);
	}

	return result;
}

function checkIsToday(year: number, month: number, day: number) {
	const currentDate = new Date(); // 현재 날짜 가져오기
	const currentYear = currentDate.getFullYear(); // 현재 연도
	const currentMonth = currentDate.getMonth() + 1; // 현재 월
	const currentDay = currentDate.getDate(); // 현재 일

	// 전달받은 year, month, day와 현재 날짜를 비교하여 오늘인지 확인
	return year === currentYear && month === currentMonth && day === currentDay;
}