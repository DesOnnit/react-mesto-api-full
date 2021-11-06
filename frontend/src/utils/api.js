class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  _makeRequest(url, method, body) {
    const feathOptons = {
      method: method,
      headers: this.headers,
    };
    if (body) {
      feathOptons.body = JSON.stringify(body);
    }
    return fetch(`${this.baseUrl}/${url}`, feathOptons).then((res) => {
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
      `cards/likes/${cardId}`,
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
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-25",
  headers: {
    authorization: "6faffa29-8c7e-4cda-bdee-257e8f797ff2",
    "Content-Type": "application/json",
  },
});

export default api;
