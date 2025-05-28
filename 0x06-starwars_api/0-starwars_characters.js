#!/usr/bin/node

const request = require('request');
const movieId = process.argv[2];

if (!movieId) {
  console.error('Usage: ./0-starwars_characters.js <Movie ID>');
  process.exit(1);
}

const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

request(apiUrl, (err, res, body) => {
  if (err) {
    console.error(err);
    return;
  }

  const filmData = JSON.parse(body);
  const characters = filmData.characters;

  // Fetch and print each character in the original order
  const fetchCharacter = (index) => {
    if (index >= characters.length) return;

    request(characters[index], (err, res, body) => {
      if (!err) {
        const characterData = JSON.parse(body);
        console.log(characterData.name);
        fetchCharacter(index + 1);
      } else {
        console.error(err);
      }
    });
  };

  fetchCharacter(0);
});
