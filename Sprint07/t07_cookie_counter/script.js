document.addEventListener('DOMContentLoaded', function() 
{
    const element_counter = document.getElementById('text_counter');
    
    async function update_counter() 
    {
        try 
        {
            element_counter.textContent = '...';
            
            const response = await fetch('/count');
            const data = await response.json();
            
            element_counter.innerHTML = `<b>${data.count}</b>`;
        } catch(error) 
        {
            console.error('Error updating counter:', error);
            element_counter.textContent = 'Error';
        }
    }
    
    update_counter();
});