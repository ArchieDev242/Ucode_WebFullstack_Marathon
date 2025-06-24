const films = {
    back_to_the_future: 
    {
        title: "Back to the Future",
        date: "July 3, 1985",
        actors: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson"],
        info: "A teenager accidentally travels back to 1955 in a time-traveling DeLorean invented by his eccentric friend, Doc Brown.",
        poster: "assets/images/back_to_the_future.jpg"
    },

    deadpool: 
    {
        title: "Deadpool",
        date: "February 12, 2016",
        actors: ["Ryan Reynolds", "Morena Baccarin", "Ed Skrein"],
        info: "A wisecracking mercenary with accelerated healing powers embarks on a quest for revenge after a botched experiment leaves him disfigured.",
        poster: "assets/images/deadpool.jpg"
    },

    free_guy: 
    {
        title: "Free Guy",
        date: "August 13, 2021",
        actors: ["Ryan Reynolds", "Jodie Comer", "Taika Waititi"],
        info: "A bank teller discovers he’s a background character in a video game and decides to become the hero of his own story.",
        poster: "assets/images/free_guy.jpg"
    },

    kingsman: 
    {
        title: "Kingsman: The Secret Service",
        date: "February 13, 2015",
        actors: ["Colin Firth", "Taron Egerton", "Samuel L. Jackson"],
        info: "A young man is recruited into a secret spy organization and must stop a tech genius from wreaking havoc on the world.",
        poster: "assets/images/kingsman.jpg"
    }
};

const film_list = document.getElementById("film_list");
const film_title = document.getElementById("film_title");
const film_date = document.getElementById("film_date");
const film_actors = document.getElementById("film_actors");
const film_info = document.getElementById("film_info");
const film_poster_image = document.getElementById("film_poster");
const film_details = document.getElementById("film_details");

function film_details_update(filmKey) 
{
    const film = films[filmKey];

    film_details.classList.add("fade");

    setTimeout(() => {
        film_title.textContent = film.title;
        film_date.textContent = film.date;
        film_info.textContent = film.info;
        film_poster_image.src = film.poster;
        film_poster_image.alt = `${film.title} movie poster`;

        film_actors.innerHTML = "";

        film.actors.forEach(actor => {
            const button = document.createElement("button");
            button.textContent = actor;
            film_actors.appendChild(button);
        });

        film_details.classList.remove("fade");
    }, 150);
}

document.addEventListener("click", (event) => {
    const target = event.target;

    if(target.classList.contains("film_title")) 
        {
        event.preventDefault();
        const film_key = target.getAttribute("data_film");

        film_details_update(film_key);

        document.querySelectorAll(".film_title").forEach(link => {
            link.classList.remove("active");
        });
        
        target.classList.add("active");
    }
});

film_details_update("deadpool");