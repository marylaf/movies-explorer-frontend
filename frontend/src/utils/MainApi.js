class MainApi {
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
  
    deleteMovie(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes `, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData);
    }
  
    saveMovie() {
      return fetch(`${this._baseUrl}/movies `, {
        method: 'POST',
        headers: this._headers,
      }).then(this._getResponseData);
    }


    register(email, password, name) {
      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      }).then(this._getResponseData)
    }

    setHeaders(headers) {
      this._headers = headers;
    }

    async _getResponseData(res) {
      const resJson = await res.json();
      console.log("RES", resJson);
        if (!res.ok) {
          return Promise.reject(resJson.message);
        }
        return res.json();
      }
  }
  
  export const mainApi = new MainApi({
    // baseUrl: "https://api.mary.student.nomoredomains.monster",
    baseUrl: "http://localhost:3000",
  });
