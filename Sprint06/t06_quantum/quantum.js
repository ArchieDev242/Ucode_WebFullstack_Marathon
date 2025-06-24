export function calculateTime() 
{
    const date_start_stamp = new Date(1939, 0, 1).getTime();
    const date_current_stamp = Date.now();
    
    const total_ms = date_current_stamp - date_start_stamp;
    
    const quantum_total_days = (total_ms / 86400000) / 7;
    
    const years = Math.floor(quantum_total_days / 365);
    const months = Math.floor((quantum_total_days % 365) / 30);
    const days = Math.floor((quantum_total_days % 365) % 30);

    return [years, months, days];
}