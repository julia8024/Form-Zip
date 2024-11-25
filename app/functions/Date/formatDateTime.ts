import { DateTime } from "@/app/shared/types/commonProps";
import getTodayDate from "./getTodayDate";

// 날짜시간 표기 : yyyy-mm-ddTHH:MM:SS -> DateTime 객체로 변환하는 메소드
export default function formatStrToDateTime(dateTimeStr: string): DateTime {
	const [date, time] = dateTimeStr.split("T"); // "yyyy-mm-dd"와 "HH:MM:SS" 부분 분리

	const [year, month, day] = date.split("-"); // 날짜 부분 분리

	let hour, minute = 0;
	let ampm = "AM";
	if (time) {
		const [hourTmp, minuteTmp] = time.split(":"); // 시간 부분 분리

		// 24시간을 12시간으로 변환
		const { hour: hourRes, ampm: ampmRes } = convertTo12Hour(parseInt(hourTmp));
		hour = hourRes;
		minute = parseInt(minuteTmp);
		ampm = ampmRes;
	}

	return {
		year: parseInt(year),
		month: parseInt(month),
		day: parseInt(day),
		hour: hour, // 시간이 없을 경우 0 처리
		minute: minute,
		ampm: ampm,
	};
}

// 날짜시간 표기 : DateTime 객체 -> yyyy-mm-ddTHH:MM:SS 문자열로 변환하는 메소드
export function formatDateTimeToStr(dateTime: DateTime): string {
	const TODAY = getTodayDate();
	const year = (dateTime.year ?? TODAY.year).toString().padStart(4, "0");
	const month = (dateTime.month ?? TODAY.month).toString().padStart(2, "0");
	const day = (dateTime.day ?? TODAY.day).toString().padStart(2, "0");

	const hour = convertTo24Hour(dateTime.hour ?? 0, dateTime.ampm ?? "AM")
		.toString()
		.padStart(2, "0");
	const minute = dateTime.minute?.toString().padStart(2, "0") ?? "00";

	return `${year}-${month}-${day}T${hour}:${minute}:00`.replaceAll(
		"undefined",
		""
	);
}

// String -> 날짜 시간 예쁘게 표기
export function formatPrettyStr(dateTimeStr: string): string {
	const [date, time] = dateTimeStr.split("T"); // "yyyy-mm-dd"와 "HH:MM:SS" 부분 분리

	const [year, month, day] = date.split("-"); // 날짜 부분 분리

	let hour, minute;
	[hour, minute] = time.split(":"); // 시간 부분 분리

	// 24시간을 12시간으로 변환
	const { hour: convertedHour, ampm } = convertTo12Hour(parseInt(hour));

	return `${year}년 ${month}월 ${day}일 ${convertedHour}:${minute}:00 ${ampm}`;
}


// 시간표기 : 24시간 표기(문자열) -> 12시간 & 오전/오후 표기(객체)로 변환하는 메소드
export function convertTo12Hour(hour: number): { hour: number; ampm: string } {
	let ampm = "AM";

	if (hour === 0) {
		hour = 12; // 00시는 12AM
	} else if (hour === 12) {
		ampm = "PM"; // 12시는 12PM
	} else if (hour > 12) {
		hour -= 12;
		ampm = "PM"; // 오후는 PM으로 설정
	}

	return { hour, ampm };
}

// 시간표기 : 12시간 & 오전/오후 표기(객체) -> 24시간 표기(문자열)로 변환하는 메소드
function convertTo24Hour(hour: number, ampm: string): number {
	if (ampm === "AM" && hour === 12) {
		return 0; // 12AM은 00시
	} else if (ampm === "PM" && hour !== 12) {
		return hour + 12; // PM 시간은 12를 더해 24시간제로 변환
	}
	return hour;
}
