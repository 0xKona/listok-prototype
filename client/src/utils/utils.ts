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

export const dataDayToDisplayText = (day: string): string => {
  switch (day) {
    case 'mon': return 'Monday';
    case 'tue': return 'Tuesday';
    case 'wed': return 'Wednesday';
    case 'thur': return 'Thursday';
    case 'fri': return 'Friday';
    case 'sat': return 'Saturday';
    case 'sun': return 'Sunday';
    default: return 'Invalid Day'
  }
}

export const base64ToBlob = (base64: any, mimeType = '') => {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: mimeType});
  return blob;
};


