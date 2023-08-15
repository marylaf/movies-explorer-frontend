class Api {
    constructor({ baseUrl, headers }) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
  
    getInitialMovies() {
      return fetch(`${this._baseUrl}`, {
        headers: this._headers,
      }).then(this._getResponseData)
      .then((movies) => {
        return movies.map((movie) => {
          return {
            ...movie,
            image: `${"https://api.nomoreparties.co/"}${movie.image.url}`,
            thumbnail: `${"https://api.nomoreparties.co/"}${movie.image.formats.thumbnail.url}`,
            // duration: this._convertToHoursAndMinutes(movie.duration),
          };
        });
      });
    }

    _convertToHoursAndMinutes(durationInMinutes) {
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;
      return `${hours}ч ${minutes}м`;
    }

    _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      }
  }
  
  export const api = new Api({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers:{
      "Content-Type": 'application/json'
    },
  });