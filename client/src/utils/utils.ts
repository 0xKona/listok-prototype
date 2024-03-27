import dayjs from "dayjs";

export const weekDateText = (weekStart: string) => {
    const dateArr = weekStart.split('-');
    const getMonthName = (monthNumber: any) => {
        const monthIndex = parseInt(monthNumber, 10) - 1;
        const date = dayjs(new Date(2024, monthIndex, 1));
        const monthName = date.format('MMMM');
        return monthName;
    }
    return `${dateArr[2]}th ${getMonthName(dateArr[1])}`
}