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

    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData);
    }
  
    deleteLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes `, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData);
    }
  
    saveMovie() {
      return fetch(`${this._baseUrl}/movies `, {
        method: "PUT",
        headers: this._headers,
      }).then(this._getResponseData);
    }
  
    changeLikeStatus(id, isLiked) {
      return !isLiked ? this.addLike(id) : this.deleteLike(id);
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