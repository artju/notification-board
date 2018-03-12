export function convertDate(ISODate) {
    let date = new Date(ISODate);
    let newDate =  date.getDate() + '.'+(date.getMonth()+1) + '.' + date.getFullYear() +' ' + date.getHours() + ':';
    if (date.getMinutes() < 10) {
      newDate += '0' + date.getMinutes();
    } else {
      newDate += date.getMinutes();
    }
    return newDate;
}
