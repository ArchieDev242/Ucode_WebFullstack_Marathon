function getFormattedDate(dateObject) 
{
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const add_zero = num => num.toString().padStart(2, '0');
    
    const day = add_zero(dateObject.getDate());
    const month = add_zero(dateObject.getMonth() + 1);
    const year = dateObject.getFullYear();
    const hours = add_zero(dateObject.getHours());
    const minutes = add_zero(dateObject.getMinutes());
    const weekday = days[dateObject.getDay()];
    
    return `${day}.${month}.${year} ${hours}:${minutes} ${weekday}`;
}