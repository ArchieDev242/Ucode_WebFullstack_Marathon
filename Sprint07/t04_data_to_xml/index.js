const express = require('express');
const path = require('path');
const fs = require('fs');
const AvengerQuote = require('./AvengerQuote');
const Comment = require('./Comment');
const ListAvengerQuotes = require('./ListAvengerQuotes');

const app = express();
const port = 3000;
const XML_FILE = path.join(__dirname, 'avenger_quote.xml');

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function create_sample_data() 
{
    const comment1 = new Comment(new Date(2024, 4, 1), "Cap's leadership is amazing!");
    const comment2 = new Comment(new Date(2024, 4, 2), "Cap's determination shines!");
    const comment3 = new Comment(new Date(2024, 3, 15), "Scarlet Witch is powerful!");
    const comment4 = new Comment(new Date(2024, 3, 20), "Strange's wisdom is unmatched!");
    const comment5 = new Comment(new Date(2024, 0, 8), "Black Panther's wisdom is profound!");
    const comment6 = new Comment(new Date(2024, 1, 5), "Wakanda forever!");
    const comment7 = new Comment(new Date(2024, 4, 5), "Deadpool's humor is epic!");
    const comment8 = new Comment(new Date(2024, 3, 25), "Thor's journey is epic!");
    const comment9 = new Comment(new Date(2024, 2, 10), "Lightning strikes again!");
    const comment10 = new Comment(new Date(2024, 1, 15), "God of thunder rocks!");
    const comment11 = new Comment(new Date(2024, 2, 18), "I love her powers!");
    const comment12 = new Comment(new Date(2024, 3, 5), "Her magic is incredible.");
    const comment13 = new Comment(new Date(2024, 4, 7), "The fourth wall breaker!");
    const comment14 = new Comment(new Date(2024, 1, 22), "So funny and chaotic!");
    const comment15 = new Comment(new Date(2024, 2, 3), "Chimichanga lover!");
    const comment16 = new Comment(new Date(2024, 3, 11), "Best sorcerer ever!");
    const comment17 = new Comment(new Date(2024, 0, 12), "Master of the mystic arts!");
    const comment18 = new Comment(new Date(2024, 2, 7), "Time stone wielder");
    const comment19 = new Comment(new Date(2024, 1, 27), "Vibranium technology rules!");
    const comment20 = new Comment(new Date(2024, 3, 14), "The greatest King of Wakanda!");

    const quote2 = new AvengerQuote(
        1,
        "Steve Rogers / Captain America",
        "I can do this all day.",
        [
            "https://terrigen-cdn-dev.marvel.com/content/prod/1x/003cap_ons_crd_03.jpg",
            "https://static1.srcdn.com/wordpress/wp-content/uploads/2019/05/Chris-Evans-as-Captain-America-in-Endgame.jpg"
        ],
        new Date(2024, 2, 10),
        [comment1, comment2, comment19]
    );

    const quote3 = new AvengerQuote(
        2,
        "Wanda Maximoff / Scarlet Witch",
        "You took everything from me. You will.",
        [
            "https://terrigen-cdn-dev.marvel.com/content/prod/1x/012scw_ons_crd_02.jpg",
            "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/03/WandaVision-Scarlet-Witch-Costume.jpg"
        ],
        new Date(2024, 3, 5),
        [comment3, comment11, comment12, comment20]
    );

    const quote4 = new AvengerQuote(
        3,
        "Dr. Stephen Strange",
        "We're in the endgame now.",
        [
            "https://terrigen-cdn-dev.marvel.com/content/prod/1x/009drs_ons_crd_02.jpg",
            "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/12/doctor-strange-2-benedict-cumberbatch.jpg"
        ],
        new Date(2024, 2, 20),
        [comment4, comment16, comment17, comment18]
    );

    const quote5 = new AvengerQuote(
        4,
        "T'Challa / Black Panther",
        "In times of crisis, the wise build bridges while the foolish build barriers.",
        [
            "https://terrigen-cdn-dev.marvel.com/content/prod/1x/007blp_ons_crd_02.jpg",
            "https://static1.srcdn.com/wordpress/wp-content/uploads/2018/02/Chadwick-Boseman-as-Black-Panther.jpg"
        ],
        new Date(2024, 0, 8),
        [comment5, comment6]
    );

    const quote7 = new AvengerQuote(
        5,
        "Wade Wilson / Deadpool",
        "Maximum effort!",
        [
            "https://wallpapercave.com/deadpool-4k-wallpapers",
            "https://terrigen-cdn-dev.marvel.com/content/prod/1x/deadpool_ons_crd_01.jpg"
        ],
        new Date(2024, 4, 1),
        [comment7, comment13, comment14, comment15]
    );

    const quote8 = new AvengerQuote(
        6,
        "Thor Odinson",
        "I'm still worthy!",
        [
            "https://terrigen-cdn-dev.marvel.com/content/prod/1x/004tho_ons_crd_03.jpg",
            "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/07/Thor-Love-and-Thunder-Chris-Hemsworth.jpg"
        ],
        new Date(2024, 3, 25),
        [comment8, comment9, comment10]
    );

    const quotesList = new ListAvengerQuotes([quote2, quote3, quote4, quote5, quote7, quote8]);
    
    return quotesList;
}

async function process_data() 
{
    const original_quotes = create_sample_data();
    
    const str_xml = original_quotes.toXML();
    original_quotes.toXMLFile(XML_FILE);
    
    const convertedQuotes = await ListAvengerQuotes.fromXMLFile(XML_FILE);
    
    return {
        original: { quotes: original_quotes.quotes },
        converted: { quotes: convertedQuotes.quotes },
        xml: str_xml
    };
}

app.get('/api/quotes', (req, res) => {
    const quotesList = create_sample_data();
    res.json(quotesList.quotes);
});

app.get('/api/quotes/xml', (req, res) => {
    const quotesList = create_sample_data();
    const xmlString = quotesList.toXML();
    
    res.header('Content-Type', 'application/xml');
    res.send(xmlString);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/process-data', async (req, res) => {
    try 
    {
        const data = await process_data();
        res.json(data);
    } catch (error) 
    {
    console.error('Error processing data:', error);
        res.status(500).json({ error: `An error occurred while processing data: ${error.message}` });
    }
});

app.listen(port, async () => {
    console.log(`Server started on port http://localhost:${port}`);
    await process_data(); 
});