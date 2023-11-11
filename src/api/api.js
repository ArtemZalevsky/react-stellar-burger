const url = "https://norma.nomoreparties.space/api/";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options) {
  return fetch(`${url}${endpoint}`, options)
    .then(checkResponse)
}

const getDataFetch = () => {
  return request('ingredients')
}

const postOrder = (ingredients) => {
  return request('orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients
    })
  })
}

export { getDataFetch, postOrder }