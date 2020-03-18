'use strict';

function getRepos(handle) {
    let url = 'https://api.github.com/users/' + handle + '/repos';
    
    fetch(url)
    .then(response => response.json())
    .then(responseJson => listRepos(responseJson))
    .catch(err => {
        $('.error').append(`<h2>Something went wrong...</h2>
        <p>${err.message}</p>`)
    });
}

function listRepos(responseJson) {
    $('.repolist').empty();
    $('.results').removeClass('hidden'); 
    
    if (responseJson.status == 200) {
        for (let i = 0; i < responseJson.length; i++) {
         $('.repolist').append(`<li><h2>${responseJson[i].name}</h2><p><a href="${responseJson[i].url}">View this repo</a></p></li>`)
        }
    }

    else if (responseJson.status == 404) {
        showError(responseJson);
    }
}

function showError(err) {
    console.log('an error occurred...')
    $('.error').empty();
    $('.error').removeClass('hidden').append(`<p>${err.message}</p>`);
}

function formSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        $('.error').empty().addClass('hidden');
        let handle = $('#handle').val();
        getRepos(handle);
    });
}

$(formSubmit);