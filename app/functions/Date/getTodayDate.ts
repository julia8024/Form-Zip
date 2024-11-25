export default function getTodayDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
	const day = String(today.getDate()).padStart(2, "0"); // 날짜가 한 자리일 경우 앞에 0 추가
  
	const defaultDate = `${year}-${month}-${day}`;
  //   console.log(defaultDate); // 예: "2024-10-14"
	return defaultDate;
  }