'use strict'
import axios from 'axios'
const base = 'http://localhost:3000/'

const api = axios.create({
	baseURL: base,
})

export function fetchUserList() {
	console.log("Fetch userList: ")
	return api.get('/user/list');
}

export function fetchUserPhotos(id) {
	let url = base + 'photosOfUser/' + id
	let res = sendHttpRequest('GET', url)
	return res == null ? [] : res;
}

export function fetchUserById(id) {
	let url = base + 'user/' + id
	return sendHttpRequest('GET', url);
}

function sendHttpRequest(method, url, body, header) {
	const xhr = new XMLHttpRequest()
	xhr.open(method, url, false)
	if (header != null) xhr.setRequestHeader(header)
	xhr.send(body)
	try {
		return JSON.parse(xhr.responseText)
	} catch(err) {
		console.log(err)
		return null
	};
}