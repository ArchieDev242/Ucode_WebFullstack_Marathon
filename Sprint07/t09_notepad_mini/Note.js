class Note 
{
    constructor(name, importance, text) {
        this.date = new Date();
        this.name = name;
        this.importance = importance;
        this.text = text;
    }

    formatDate() 
    {
        const date = this.date;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    toJSON() 
    {
        return {
            date: this.formatDate(),
            name: this.name,
            importance: this.importance,
            text: this.text
        };
    }
}

export default Note;