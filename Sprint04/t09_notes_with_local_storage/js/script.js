document.addEventListener('DOMContentLoaded', function() 
{
    const note_input = document.getElementById('note_input');
    const add_btn = document.getElementById('add_btn');
    const clear_btn = document.getElementById('clear_btn');
    const notes_archive = document.getElementById('notes_archive');

    function get_formatted_date() 
    {
        const date = new Date();

        return [
            String(date.getDate()).padStart(2, '0'),
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getFullYear()).slice(-2)
        ].join('.') + ', ' + [
            String(date.getHours()).padStart(2, '0'),
            String(date.getMinutes()).padStart(2, '0'),
            String(date.getSeconds()).padStart(2, '0')
        ].join(':');
    }

    function notes_display_update() 
    {
        const notes = localStorage.getItem('notes');
        notes_archive.innerHTML = notes 
            ? notes.replace(/\n/g, '<br>') 
            : '<span class="empty_text">[Empty]</span>';
    }

    notes_display_update();

    add_btn.addEventListener('click', function() 
    {
        const note_txt = note_input.value.trim();
        
        if(!note_txt) 
            {
            alert("It's empty. Try to input something in \"Text input\"");
            return;
        }

        const note_new = `--> ${note_txt} [${get_formatted_date()}]`;
        const notes_existing = localStorage.getItem('notes') || '';
        
        localStorage.setItem('notes', notes_existing ? `${notes_existing}\n${note_new}` : note_new );
        
        note_input.value = '';
        notes_display_update();
    });

    clear_btn.addEventListener('click', function() 
    {
        if(confirm('Are you sure?')) 
            {
            localStorage.removeItem('notes');
            notes_display_update();
        }
    });
});