import { API_CONFIG } from "./constants";
export default class Api {
  constructor(config) {
    this._url = config.url;
    this._header = config.header;
  }
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(response.status));
  }

  _getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._header,
    }).then(this._checkResponse);
  }
  newLike(id, likecheck) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: (likecheck ? "delete": "PUT"),
      headers: this._header,
    }).then(this._checkResponse);
  }
 
  _getOwnerInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._header,
    }).then(this._checkResponse);
  }
  createCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  removeCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._header,
    }).then(this._checkResponse);
  }
  editAvatar(userPic) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar: userPic,
      }),
    }) 
    .then(this._checkResponse)  
  }
  getData() {
    return Promise.all([this._getOwnerInfo(), this._getInitialCards()]);
  }
  setUserInfo(name, job) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        'name': name,
        'about': job
    })   
    }).then(this._checkResponse);
  }
}
export const api = new Api(API_CONFIG);