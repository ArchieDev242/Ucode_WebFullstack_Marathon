document.addEventListener('DOMContentLoaded', function() 
{
    const form_note = document.getElementById('form_note');
    const list_notes = document.getElementById('list_notes');
    const box_detail = document.getElementById('box_detail');

    load_notes();

    form_note.addEventListener('submit', async function(e) 
    {
        e.preventDefault();

        const name = document.getElementById('input_name').value;
        const importance = document.getElementById('select_importance').value;
        const text = document.getElementById('input_text').value;

        await create_note(name, importance, text);
        form_note.reset();
        load_notes();
    });

    async function create_note(name, importance, text) 
    {
        const response = await fetch('/create-note', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, importance, text })
        });

        if(!response.ok) throw new Error('Failed to create note');
    }

    async function load_notes() 
    {
        const response = await fetch('/notes');
        const notes = await response.json();
        list_notes.innerHTML = '';
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" onclick="showDetail(${index}); return false;">${note.date} > ${note.name}</a> <a href="#" onclick="deleteNote(${index}); return false;">DELETE</a>`;
            list_notes.appendChild(li);
        });
    }

    window.showDetail = async function(index) 
    {
        const response = await fetch(`/note/${index}`);
        const html = await response.text();
        box_detail.innerHTML = html;
    };

    window.deleteNote = async function(index) 
    {
        const response = await fetch(`/delete/${index}`, { method: 'DELETE' });
        if(response.ok) load_notes();
    };
});