export function calculateTime() 
{
    const date_start_from = new Date(1939, 0, 1);
    const date_current = new Date();
    
    let years = date_current.getFullYear() - date_start_from.getFullYear();
    let months = date_current.getMonth() - date_start_from.getMonth();
    let days = date_current.getDate() - date_start_from.getDate();

    if(days < 0) 
        {
        const prev_month_lday = new Date(date_current.getFullYear(), date_current.getMonth(), 0);
        days += prev_month_lday.getDate();
        months--;
    }

    if(months < 0) 
        {
        months += 12;
        years--;
    }

    return {
        years: () => years,
        months: () => months,
        days: () => days
    };
}