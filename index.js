'use strict';

function getRepos(handle) {
    let url = 'https://api.github.com/users' + handle + 'repos';
    
    fetch(url)
    .then(response => response.json())
    .then(responseJson => listRepos(responseJson));
    .catch(err => showError());
}

function listRepos(responseJson) {
    $('.repolist').empty();

    if (responseJson.status === 'success') {
       $('.results').removeClass('hidden'); 
       //<li><h2>${responseJson.repotitle}</h2><p><a href="${responseJson.repoURL}">View this repo</a></p></li>
    }

    else if (responseJson.status === 'error') {
        $('.results').addClass('hidden');
        showError(responseJson.message);
    }
}

function showError(message) {
    console.log('an error occurred...')
    $('.error').removeClass('hidden').append(`<p>${message}</p>`);
}

function formSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        $('.error').addClass('hidden');
        let handle = $('#handle').val();
        getRepos(handle);
    });
}

$(formSubmit);