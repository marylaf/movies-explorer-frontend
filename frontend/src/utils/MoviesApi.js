class Api {
    constructor({ baseUrl, headers }) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
  
    getInitialMovies() {
      return fetch(`${this._baseUrl}`, {
        headers: this._headers,
      }).then(this._getResponseData);
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
  });