function total(addCount, addPrice, currentTotal = 0) 
{
    const total_calc = Number(currentTotal) + (Number(addCount) * Number(addPrice));
    return Number(total_calc.toFixed(2));
}