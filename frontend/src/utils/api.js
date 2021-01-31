export default class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.getHeaders(),
    }).then((res) => this._getResponseData(res));
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.getHeaders(),
    }).then((res) => this._getResponseData(res));
  }

  postNewCard(item) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(item),
    }).then((res) => this._getResponseData(res));
  }

  setUserInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  setUserAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardID) {
    return fetch(`${this.url}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    }).then((res) => this._getResponseData(res));
  }

  likeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.getHeaders(),
    }).then((res) => this._getResponseData(res));
  }

  dislikeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    }).then((res) => this._getResponseData(res));
  }

  getHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    };
  }
}

export const api = new Api({
  url: 'https://api.kirill251111.students.nomoredomains.work',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
});
