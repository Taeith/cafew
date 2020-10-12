
const URL = "http://127.0.0.1:4200/api";

function status(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

function target(path, method) {
  return fetch(URL + path, {
      method: method,
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

function remove(path) {
  return target(path, 'DELETE');
}

function get(path) {
	return target(path, 'GET');
}

export { get, put, post, remove };