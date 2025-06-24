import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import NotePad from './NotePad.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
const notePad = new NotePad();

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/notes', (req, res) => {
    res.json(notePad.notes.map(note => note.toJSON()));
});

app.post('/create-note', (req, res) => {
    const { name, importance, text } = req.body;
    notePad.add_note(name, importance, text);
    res.json({ success: true });
});

app.get('/note/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const note = notePad.get_note(index);
    if(note) 
        {
        res.send(`
            <h2>Detail of "${note.name}"</h2>
            <ul>
                <li>date: <b>${note.formatDate()}</b></li>
                <li>name: <b>${note.name}</b></li>
                <li>importance: <b>${note.importance}</b></li>
                <li>text: <b>${note.text}</b></li>
            </ul>
        `);
    } else 
    {
        res.status(404).json({ error: 'Note not found' });
    }
});

app.delete('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    notePad.delete_note(index);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});