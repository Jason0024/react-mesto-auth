class AuthApi {
  constructor(authUrl) {
    this._authUrl = authUrl;
  }
  // Метод обработки ответа сервера
  _parseResponse (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }
  
  // Метод верификации токена
  verifyToken (token) {
    return fetch(`${this._authUrl}users/me`, {
      // По умолчанию fetch — это GET, можно не указывать
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
      .then(this._parseResponse)
  }
  // Метод авторизации пользователя
  userAuthorization (password, email) {
    return fetch(`${this._authUrl}signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email })
    })
      .then(this._parseResponse)
  }
  // Метод регистрации пользователя
  userRegistration (password, email) {
    return fetch(`${this._authUrl}signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email })
    })
      .then(this._parseResponse)
  }
}

// Создание экземпляра класса
const apiAuth = new AuthApi('https://auth.nomoreparties.co/');
// Экспорт экземпляра класса
export default apiAuth;