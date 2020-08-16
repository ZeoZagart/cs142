'use strict'

const base = 'http://localhost:3006/'

export function fetchUserList() {
	let url = base + 'user/list'
	return sendHttpRequest('GET', url)
}

export function fetchUserPhotos(id) {
	let url = base + 'photosOfUser/' + id
	let res = sendHttpRequest('GET', url)
	return res == null ? [] : res
}

export function fetchPhotoComments(id) {
	let url = base + 'commentsOnPhotos/' + id;
	let res = sendHttpRequest('GET', url);
	return res == null ? [] : res
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
	}
}