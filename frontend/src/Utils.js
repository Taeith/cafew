
const URL = "http://127.0.0.1:4200/api";

function status(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

function update(path, body, method) {
  return fetch(URL + path, {
    method: method,
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + window.sessionStorage.getItem('CafewToken')
    },
    body: body
  })
  .then(status)
  .then(response => response.json());
}

function post(path, body) {
  return update(path, body, 'POST');
}

function put(path, body) {
  return update(path, body, 'PUT');
}

function get(path) {
	return fetch(URL + path, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + window.sessionStorage.getItem('CafewToken')
      }
    })
    .then(status)
    .then(response => response.json());
}

export { get, put, post };