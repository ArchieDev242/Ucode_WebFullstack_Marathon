document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const selected = document.querySelector('input[name="option"]:checked');
    const msg_div = document.getElementById('msg');

    if(!selected) 
        {
        msg_div.textContent = "Please select an answer!";
        return;
    }

    fetch('/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: selected.value })
    })

    .then(response => {
        if(!response.ok) throw new Error('Network error');
        return response.json();
    })

    .then(data => {
        msg_div.textContent = data.message;
    })

    .catch(error => {
        msg_div.textContent = "Error: " + error.message;
    });
});