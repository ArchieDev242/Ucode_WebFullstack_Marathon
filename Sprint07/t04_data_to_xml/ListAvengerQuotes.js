const fs = require('fs');
const xml2js = require('xml2js');
const AvengerQuote = require('./AvengerQuote');
const Comment = require('./Comment');

class ListAvengerQuotes 
{
    constructor(quotes = []) 
    {
        this.quotes = quotes;
    }

    addQuote(quote) 
    {
        this.quotes.push(quote);
    }

    toXML() 
    {
        const builder = new xml2js.Builder();
        const xmlObj = {
            quotes: {
                quote: this.quotes.map(q => ({
                    id: q.id,
                    author: q.author,
                    quote: q.quote,
                    photo: q.photo,
                    publishDate: q.publishDate.toISOString(),
                    comments: {
                        comment: q.comments.map(c => ({
                            date: c.date.toISOString(),
                            text: c.text
                        }))
                    }
                }))
            }
        };
        return builder.buildObject(xmlObj);
    }

    toXMLFile(fileName) 
    {
        const xml = this.toXML();
        fs.writeFileSync(fileName, xml);
        return xml;
    }

    static fromXML(xmlString) 
    {
        return new Promise((resolve, reject) => {
            xml2js.parseString(xmlString, (err, result) => {
                if(err) 
                    {
                    reject(err);
                    return;
                }
                
                let newQuotes = [];
                
                if(result.quotes && result.quotes.quote) 
                    {
                    newQuotes = result.quotes.quote.map(q => {
                        const comments = q.comments && q.comments[0] && q.comments[0].comment
                            ? q.comments[0].comment.map(c => new Comment(new Date(c.date[0]), c.text[0]))
                            : [];
                        
                        const photoArray = q.photo ? (Array.isArray(q.photo) ? q.photo : [q.photo[0]]) : [];
                        
                        return new AvengerQuote(
                            parseInt(q.id[0]),
                            q.author[0],
                            q.quote[0],
                            photoArray,
                            new Date(q.publishDate[0]),
                            comments
                        );
                    });
                }
                
                resolve(new ListAvengerQuotes(newQuotes));
            });
        });
    }

    static fromXMLFile(fileName) 
    {
        if(!fs.existsSync(fileName)) 
            {
            return new ListAvengerQuotes();
        }

        const xml = fs.readFileSync(fileName, 'utf8');
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, (err, result) => {
                if(err) 
                    {
                    resolve(new ListAvengerQuotes());
                    return;
                }
                
                let newQuotes = [];
                
                if(result.quotes && result.quotes.quote) 
                    {
                    newQuotes = result.quotes.quote.map(q => {
                        const comments = q.comments && q.comments[0] && q.comments[0].comment
                            ? q.comments[0].comment.map(c => new Comment(new Date(c.date[0]), c.text[0]))
                            : [];
                        
                        const photoArray = q.photo ? (Array.isArray(q.photo) ? q.photo : [q.photo[0]]) : [];
                        
                        return new AvengerQuote(
                            parseInt(q.id[0]),
                            q.author[0],
                            q.quote[0],
                            photoArray,
                            new Date(q.publishDate[0]),
                            comments
                        );
                    });
                }
                
                resolve(new ListAvengerQuotes(newQuotes));
            });
        });
    }
}

module.exports = ListAvengerQuotes;