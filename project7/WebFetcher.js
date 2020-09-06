"use strict";
import axios from "axios";
const base = "http://localhost:3000/";

const api = axios.create({
	baseURL: base,
});

const AUTH_HEADER = "AUTH-SESSION-TOKEN";
const IS_LOGGED_IN = "is-logged-in";
var header = () => ({
	headers: {
		[AUTH_HEADER]: getToken(),
	},
});

export function logout() {
	api.post("/logout", { token: getToken() });
	localStorage.removeItem(AUTH_HEADER);
	localStorage.setItem(IS_LOGGED_IN, false);
}

export function isLoggedIn() {
	return localStorage.getItem(IS_LOGGED_IN) === "true";
}

export function listenForComments(photoId) {
	// return api
	// .post("/getEventSourceLink/" + photoId, header())
	// .catch((err) => console.log(`Error connecting for comments ${err}`))
	// .then((link) => new EventSource(base + "/link"));
	return new EventSource(base + "streamComments/" + photoId);
}

export function submitPost(comment, photoId) {
	let data = { comment: comment, photo_id: photoId };
	return api.post("/postComment", data, header());
}

function getToken() {
	return localStorage.getItem(AUTH_HEADER);
}

function setToken(token) {
	console.log("Setting session token to " + token);
	localStorage.setItem(AUTH_HEADER, token);
	localStorage.setItem(IS_LOGGED_IN, "true");
}

export function fetchUserList() {
	console.log("Fetch userList: ");
	return api.get("/user/list", header());
}

export function fetchUserPhotos(id) {
	let url = base + "photosOfUser/" + id;
	let res = sendHttpRequest("GET", url, null);
	return res == null ? [] : res;
}

export function fetchUserById(id) {
	let url = base + "user/" + id;
	return sendHttpRequest("GET", url, null);
}

export function login(username, password) {
	let url = base + "login";
	let data = {
		username: username,
		password: password,
	};
	return api.post(url, data, header()).then((response) => {
		let user = response.data;
		console.log("Received user : " + JSON.stringify(user));
		setToken(user.sessionToken);
		delete user.sessionToken;
		return user;
	});
}

function sendHttpRequest(method, url, body) {
	const xhr = new XMLHttpRequest();
	xhr.open(method, url, false);
	xhr.setRequestHeader(AUTH_HEADER, getToken());
	xhr.send(body);
	try {
		return JSON.parse(xhr.responseText);
	} catch (err) {
		console.log(err);
		return null;
	}
}
