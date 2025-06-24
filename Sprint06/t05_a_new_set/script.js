const form = document.getElementById('form_candidate');

form.addEventListener('submit', async function(event) 
{
    event.preventDefault();

    let form_stuff = new FormData();

    let inputs = document.querySelectorAll('input:not([type="submit"]):not([type="reset"]), textarea');
    
    for(let i = 0; i < inputs.length; i++) 
        {
        let one_input = inputs[i];

        if(one_input.id !== 'photo') 
            {
            form_stuff.append(one_input.id, one_input.value);
        }
    }

    let photo_box = document.getElementById('photo');
    
    if(photo_box.files && photo_box.files[0]) 
        {
        form_stuff.append('photo', photo_box.files[0]);
    }

    let server_response = await fetch('/submit', {
        method: 'POST',
        body: form_stuff
    });

    let result_box = document.getElementById('result');
    
    result_box.innerText = await server_response.text();
    result_box.style.display = 'block';
});