export default function changeMonth(year: number, month: number, direction: string) {
    let currentYear = year;
    let currentMonth = month;

    if (direction === 'prev') {
        currentMonth--;
        if (currentMonth === 0) {
            currentYear--;
            currentMonth = 12;
        }
    } else if (direction === 'next') {
        currentMonth++;
        if (currentMonth === 13) {
            currentYear++;
            currentMonth = 1;
        }
    }

    return { "year": currentYear, "month": currentMonth }
}