let input_password = document.getElementById('input_password');
let input_salt = document.getElementById('input_salt');
let section_saving_pass = document.getElementById('section_savingPass');
let div_output = document.getElementById('div_output');
let section_guess_field = document.getElementById('section_guessField');
let input_guess = document.getElementById('input_guess');
let div_result = document.getElementById('div_result');
let text_data_status = document.getElementById('text_dataStatus');

fetch('/get-session')
    .then(response => response.json())
    .then(data => {
        if(data.hashedPassword) 
            {
            text_data_status.innerText = 'Password saved at session.';
            section_saving_pass.style.display = 'none';
            div_output.innerText = 'Hash: ' + data.hashedPassword;
            section_guess_field.style.display = 'block';
            div_result.innerText = '';
        } else 
        {
            text_data_status.innerText = 'Password not saved at session.';
            section_saving_pass.style.display = 'block';
            div_output.innerText = '';
            section_guess_field.style.display = 'none';
            div_result.innerText = '';
        }
    });

function saveData() 
{
    let password_value = input_password.value;
    let salt_value = input_salt.value;
    
    if(!password_value || !salt_value) 
        {
        alert('Please enter both password and salt');
        return;
    }
    
    let data_to_send = {
        password: password_value,
        salt: salt_value
    };
    
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_to_send)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) location.reload();
    });
}

function checkPassword() 
{
    let guess_value = input_guess.value;
    
    if(!guess_value) 
        {
        alert('Please enter a password guess');
        return;
    }
    
    let guess_data = {
        guess: guess_value
    };
    
    fetch('/guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(guess_data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) 
            {
            div_result.innerText = 'Hacked!';
            div_result.className = 'message_success';
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else 
        {
            div_result.innerText = 'Access denied!';
            div_result.className = 'message_error';
        }
    });
}

function clearSession() {
    fetch('/clear')
        .then(response => response.json())
        .then(data => {
            if(data.success) location.reload();
        });
}