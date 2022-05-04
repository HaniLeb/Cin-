const all_movies = document.getElementById('all-movies');
const types_btn = document.querySelectorAll('.type-btn');
const services_btn = document.querySelectorAll('.service');
const type_div = document.getElementById('type');

let service = 'netflix';
let type = 'movie';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
        'X-RapidAPI-Key': `aac0dde19amshc8e07640a741f1fp1d902ajsn8de71e070cca`
    }
};

function callApi(services, types) {
    fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${services}&type=${types}`, options)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            const data_resp = data.results;
            console.log(data_resp);

            const sect_movies = document.createElement('div');
            sect_movies.id = 'movies';

            for (let i = 0; i < data_resp.length; i++) {
                const movie = document.createElement('div');
                movie.className = 'movie';

                const img = document.createElement('img');
                img.className = 'poster';
                const title = document.createElement('h2');
                title.className = 'title';

                img.src = data_resp[i].posterURLs.original;
                title.innerText = data_resp[i].title;

                movie.append(img, title);
                sect_movies.appendChild(movie);
                all_movies.appendChild(sect_movies);
            }
        })
        .catch(err => console.error(err));
}

type_div.firstElementChild.style.background = 'rgba(255, 255, 255, 0.5)';
callApi(service, type);


types_btn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const new_type = e.target.textContent.trim();
        console.log(btn);
        console.log(new_type);

        if (new_type === 'movie') {
            type_div.firstElementChild.style.background = 'rgba(255, 255, 255, 0.5)';
            type_div.lastElementChild.style.background = '';
        } if (new_type === 'series') {
            type_div.lastElementChild.style.background = 'rgba(255, 255, 255, 0.5)';
            type_div.firstElementChild.style.background = '';
        }

        if (new_type !== type) {
            type = new_type;
            all_movies.firstElementChild.remove();
            callApi(service, type);
        }
    })
})

services_btn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const new_service = e.target.textContent.trim();
        console.log(new_service);

        if (new_service !== service) {
            service = new_service;
            all_movies.firstElementChild.remove();
            callApi(service, type);
        }
    })
})