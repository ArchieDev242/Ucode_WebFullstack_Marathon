import fs from 'fs';
import Note from './Note.js';

class NotePad 
{
    constructor() 
    {
        this.notes = [];
        this.load_notes();
    }

    load_notes() 
    {
        try 
        {
            const data = fs.readFileSync('notes.json', 'utf8');
            this.notes = JSON.parse(data).map(note => new Note(note.name, note.importance, note.text));
        } catch(error) 
        {
            this.notes = [];
        }
    }

    save_notes() 
    {
        const data = JSON.stringify(this.notes.map(note => note.toJSON()), null, 2);
        fs.writeFileSync('notes.json', data);
    }

    add_note(name, importance, text) 
    {
        const note = new Note(name, importance, text);
        this.notes.push(note);
        this.save_notes();
    }

    delete_note(index) 
    {
        this.notes.splice(index, 1);
        this.save_notes();
    }

    get_note(index) 
    {
        return this.notes[index];
    }
}

export default NotePad;