class MainApi {
    constructor({ baseUrl, headers }) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
  

    getCurrentUser() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers,
      }).then(this._getResponseData);
    }

    getMovies() {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'GET',
        headers: this._headers,
      }).then(this._getResponseData);
    }

    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData);
    }
    
    saveMovie(movie) {

      return fetch(`${this._baseUrl}/movies `, {
        method: 'POST',
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({
          country: movie.country, 
          director: movie.director, 
          duration: movie.duration, 
          movieId: movie.movieId,
          year: movie.year, 
          description: movie.description, 
          image: movie.image,
          trailerLink: movie.trailerLink, 
          thumbnail: movie.thumbnail,
          nameRU: movie.nameRU, 
          nameEN: movie.nameEN 
        }),
      }).then(this._getResponseData)
      .then((res) => { 
        console.log(res);
    })
    }

    // createMovie(movie) {
    //   return fetch(`${this._url}movies/`, {
    //     method: 'POST',
    //     headers:{
    //       "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    //       "Content-Type": 'application/json'
    //     },
    //     body: JSON.stringify({
    //       country: movie.country, 
    //       director: movie.director, 
    //       duration: movie.duration, 
    //       year: movie.year, 
    //       description: movie.description, 
    //       image: `${MOVIES_API_IMAGE_LINK}/${movie.image.url}`,
    //       trailerLink: movie.trailerLink, 
    //       thumbnail: `${MOVIES_API_IMAGE_LINK}/${movie.image.formats.thumbnail.url}`,
    //       movieId: movie.id,
    //       nameRU: movie.nameRU, 
    //       nameEN: movie.nameEN 
    //     })
    //   })
    //   .then(this._checkResponse)
    // }

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

    login(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then(this._getResponseData)
      .then((res) => {
         this._headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${res.token}`,
        };
        mainApi.setHeaders(this._headers);
        return res;
         });
    }

    updateProfile(name, email) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          email,
        }),
      }).then(this._getResponseData);
    }

    async _getResponseData(res) {
      const resJson = await res.json();
      // console.log("RES", resJson);
        if (!res.ok) {
          return Promise.reject(resJson.message);
        }
        return resJson;
      }
  }
  
  export const mainApi = new MainApi({
    // baseUrl: "https://api.mary.student.nomoredomains.monster",
    baseUrl: "http://localhost:3000",
  });
