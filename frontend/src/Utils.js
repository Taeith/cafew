
const URL = "http://127.0.0.1:4200/api";

function status(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

function put(path, body) {
	return fetch(URL + path, {
      method: 'PUT',
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

export { get, put };