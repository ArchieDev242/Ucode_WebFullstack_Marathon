let form_hero = document.getElementById('form_hero');
let input_realName = document.getElementById('input_realName');
let input_currentAlias = document.getElementById('input_currentAlias');
let input_age = document.getElementById('input_age');
let input_about = document.getElementById('input_about');
let input_levelOfControl = document.getElementById('input_levelOfControl');
let btn_clear = document.getElementById('btn_clear');
let btn_send = document.getElementById('btn_send');
let div_form = document.getElementById('div_form');
let div_result = document.getElementById('div_result');
let container_form = document.getElementById('container_form');
let container_result = document.getElementById('container_result');
let btn_forget = document.getElementById('btn_forget');

let span_saved_real_name = document.getElementById('span_savedRealName');
let span_saved_current_alias = document.getElementById('span_savedCurrentAlias');
let span_saved_age = document.getElementById('span_savedAge');
let span_saved_about = document.getElementById('span_savedAbout');
let span_saved_powers = document.getElementById('span_savedPowers');
let span_saved_level_of_control = document.getElementById('span_savedLevelOfControl');
let span_saved_publicity = document.getElementById('span_savedPublicity');
let span_saved_photo = document.getElementById('span_savedPhoto');

fetch('/get-session')
    .then(response => response.json())
    .then(data => {
        if(data.realName) 
            {
            container_form.style.display = 'none';
            div_result.style.display = 'block';
            container_result.style.display = 'block';
            
            span_saved_real_name.innerText = data.realName;
            span_saved_current_alias.innerText = data.currentAlias;
            span_saved_age.innerText = data.age;
            span_saved_about.innerText = data.about;
            
            if(Array.isArray(data.powers)) 
                {
                span_saved_powers.innerText = data.powers.length;
            } else 
            {
                span_saved_powers.innerText = data.powers ? 1 : 0;
            }
            
            span_saved_level_of_control.innerText = data.levelOfControl;
            
            if(data.publicityValue) 
                {
                span_saved_publicity.innerText = data.publicityValue;
            } else 
            {
                switch(data.publicity) 
                {
                    case 'UNKNOWN': span_saved_publicity.innerText = '1'; break;
                    case 'LIKE A GHOST': span_saved_publicity.innerText = '2'; break;
                    case 'I AM IN COMICS': span_saved_publicity.innerText = '3'; break;
                    case 'I HAVE FUN CLUB': span_saved_publicity.innerText = '4'; break;
                    case 'SUPERSTAR': span_saved_publicity.innerText = '5'; break;
                    default: span_saved_publicity.innerText = '';
                }
            }
            
            let photo_name_display = data.photoName || '';
            span_saved_photo.innerText = photo_name_display;
        } else 
        {
            container_form.style.display = 'block';
            div_form.style.display = 'block';
            container_result.style.display = 'none';
            div_result.style.display = 'none';
        }
    });

btn_clear.addEventListener('click', () => {
    form_hero.reset();
    input_realName.value = '';
    input_currentAlias.value = '';
    input_age.value = '';
    input_about.value = '';
    input_levelOfControl.value = '0';
});

btn_send.addEventListener('click', () => {
    container_form.style.display = 'none';
});

btn_forget.addEventListener('click', () => {
    fetch('/forget')
        .then(() => {
            location.reload();
        });
});