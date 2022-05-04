const input = document.getElementById('search-input');

const options_query = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'mdblist.p.rapidapi.com',
        'X-RapidAPI-Key': 'aac0dde19amshc8e07640a741f1fp1d902ajsn8de71e070cca'
    }
};

fetch(`https://mdblist.p.rapidapi.com/?s=${input}`, options_query)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => console.error(err));

input.addEventListener('keydown', (e) => {
    console.log(e.taget);
})

input.addEventListener('focusin', () => {
    input.placeholder = '';
})

input.addEventListener('focusout', () => {
    input.placeholder = "Rechercher Films/Séries";
})