import dayjs from "dayjs";



export const weekDateText = (weekStart: string) => {
    const nth = (d: any) => { //Calulates the Date 'Ordinal' using wizardry
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
      };

    const dateArr = weekStart.split('-');

    const getMonthName = (monthNumber: any) => {
        const monthIndex = parseInt(monthNumber, 10) - 1;
        const date = dayjs(new Date(2024, monthIndex, 1));
        const monthName = date.format('MMMM');
        return monthName;
    }
    return `${parseInt(dateArr[2])}${nth(parseInt(dateArr[2]))} ${getMonthName(dateArr[1])}`
}

