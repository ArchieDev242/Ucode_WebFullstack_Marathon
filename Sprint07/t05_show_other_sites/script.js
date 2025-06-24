document.addEventListener('DOMContentLoaded', function() 
{
    const input_url = document.getElementById('input_url');
    const form_url = document.getElementById('form_url');

    form_url.addEventListener('submit', function(e) 
    {
        const url = input_url.value.trim();
        try 
        {
            new URL(url);
        } catch(err) 
        {
            e.preventDefault();
            alert('Please enter a valid URL');
        }
    });
});