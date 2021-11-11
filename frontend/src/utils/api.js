class Api {
  constructor({ baseUrl, credentials, headers }) {
    this._baseUrl = baseUrl;
    this._credentials = credentials;
    this._headers = headers;
  }
  _makeRequest(url, method, body) {
    const feathOptons = {
      method: method,
      headers: this._headers,
      credentials: this._credentials
    };
    if (body) {
      feathOptons.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}/${url}`, feathOptons).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.status);
    });
  }

  getUserInfo() {
    return this._makeRequest("users/me", "GET");
  }
  getInitialCards() {
    return this._makeRequest("cards", "GET");
  }
  saveUserInfo(item) {
    return this._makeRequest("users/me", "PATCH", item);
  }
  getNewCard(item) {
    return this._makeRequest("cards", "POST", item);
  }
  deleteCard(cardId) {
    return this._makeRequest(`cards/${cardId}`, "DELETE");
  }
  changeLikeCardStatus(cardId, isLiked) {
    return this._makeRequest(
      `cards/${cardId}/likes`,
      `${isLiked ? "PUT" : "DELETE"}`
    );
  }
  handleAvatarChange(item) {
    return this._makeRequest(`users/me/avatar`, "PATCH", item);
  }
  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

const api = new Api({
  baseUrl: "https://api.onnit.student.nomoredomains.rocks",
  credentials: 'include',
  headers: {
    "Content-Type": "application/json"
  },
});

export default api;