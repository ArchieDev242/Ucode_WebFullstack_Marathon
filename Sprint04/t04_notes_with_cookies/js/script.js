document.addEventListener('DOMContentLoaded', function() 
{
    const note_input = document.getElementById('note_input');
    const add_btn = document.getElementById('add_btn');
    const clear_btn = document.getElementById('clear_btn');
    const notes_archive = document.getElementById('notes_archive');

    function get_cookies(name) 
    {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);

        if(parts.length === 2) 
            {
            const encoded_value = parts.pop().split(';').shift();
            return encoded_value ? decodeURIComponent(encoded_value) : null;
        }

        return null;
    }

    function set_cookies(name, value, days) 
    {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
    }

    function load_notes() 
    {
        const notes = get_cookies('notes');

        if(notes) 
            {
            notes_archive.textContent = notes;
        } else 
        {
            notes_archive.innerHTML = '<span class="empty_text">[Empty]</span>';
        }
    }

    load_notes();

    add_btn.addEventListener('click', function() 
    {
        const note_txt = note_input.value.trim();

        if(note_txt === '') 
            {
            alert("It's empty. Try to input something in \"Text input\"");

            return;
        }

        let notes_current = get_cookies('notes') || '';
        let note_new = `-->${note_txt}`;

        if(notes_current && notes_current !== '[Empty]') 
            {
            notes_current += '\n' + note_new;
        } else 
        {
            notes_current = note_new;
        }

        set_cookies('notes', notes_current, 30);
        load_notes();
        note_input.value = '';
    });

    clear_btn.addEventListener('click', function() 
    {
        const confirm_clear = confirm('Are you sure?');

        if(confirm_clear) 
            {
            set_cookies('notes', '', -1);
            notes_archive.innerHTML = '<span class="empty_text">[Empty]</span>';
        }
    });
});