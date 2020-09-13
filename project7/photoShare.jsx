import React from "react";
import ReactDOM from "react-dom";
import {
	HashRouter,
	Route,
	Switch,
	withRouter,
	Link,
	Redirect,
} from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import "./styles/main.css";

// import necessary components
import TopBar from "./components/topBar/TopBar";
import UserDetail from "./components/userDetail/UserDetail";
import UserList from "./components/userList/UserList";
import * as fetcher from "./WebFetcher.js";
import Login from "./components/login/Login";
import Register from "./components/login/Register";

class PhotoShare extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			drawerStateOpen: false,
			isLoggedIn: this.isLoggedIn(),
		};
		this.drawerStateChanged = this.drawerStateChanged.bind(this);
		this.getUserDetailsViewType = this.getUserDetailsViewType.bind(this);
		this.setUserList = this.setUserList.bind(this);
	}

	isLoggedIn() {
		return fetcher.isLoggedIn();
	}

	onNotLoggedIn(history) {
		history.push("/login");
	}

	componentDidMount() {
		if (!this.isLoggedIn) return;
		fetcher
			.fetchUserList(this.setUserList)
			.then((resp) => {
				console.log(resp);
				this.setUserList(resp.data);
			})
			.catch((err) => console.log(err));
	}

	setUserList(userList) {
		this.setState({
			users: userList,
		});
		console.log(
			"Updated userList to : " + JSON.stringify(this.state.users)
		);
	}

	drawerStateChanged(isOpen) {
		this.setState({
			drawerStateOpen: isOpen,
		});
	}

	getUserDetailsViewType() {
		return this.state.drawerStateOpen === true ? "avatarName" : "avatar";
	}

	getUserPhotos(userId) {
		let base = "../../images/";
		let photos = fetcher.fetchUserPhotos(userId).map((photo) => {
			photo.src = base + photo.file_name;
			return photo;
		});
		return photos;
	}

	getUser(id) {
		let user = this.state.users.find((user) => user._id === id);
		if (user) {
			return user;
		} else {
			return fetcher.fetchUserById(id);
		}
	}

	getUserName(id) {
		let user = this.getUser(id);
		if (user) {
			let name = user.first_name + " " + user.last_name;
			return name;
		} else {
			return "Login to see name...";
		}
	}

	getPageName(location) {
		let splits = location.split("/").filter((it) => it.length > 0);
		if (splits.length == 0) return "Home";
		if (splits.length == 1) {
			if (splits.includes("users")) return "All users";
			else return "404 NOT FOUND";
		}
		let userId = splits[1];
		let userName = this.getUserName(userId);
		if (splits.length == 2) {
			if (splits.includes("users")) {
				return userName;
			} else {
				return userName + "'s photos";
			}
		}
	}

	getUserId(location) {
		let splits = location.split("/").filter((it) => it.length > 0);
		if (splits.length == 2) {
			return splits[1];
		}
		return "";
	}

	getUserPage(location) {
		let splits = location.split("/").filter((it) => it.length > 0);
		if (splits.length == 2) {
			if (splits.includes("users")) {
				return "DETAILS";
			} else {
				return "PHOTOS";
			}
		} else {
			return "NOT_SHOWN";
		}
	}

	switchUserPageTo(destination, location, history) {
		let userPage = this.getUserPage(location);
		if (userPage === "NOT_SHOWN") return;
		let newLocation =
			destination === "PHOTOS"
				? location.replace("users", "photos")
				: location.replace("photos", "users");
		console.log("SWITCHED PAGE TO : " + newLocation);
		history.push(newLocation);
	}

	render() {
		console.log("Render called for photoShare.jsx");
		let dataMarginLeft = this.state.drawerStateOpen ? 500 : 150;
		const { location, history } = this.props;
		return (
			<HashRouter>
				<div>
					<Grid container spacing={8} direction="column">
						<Grid item>
							{
								<TopBar
									pageName={this.getPageName(
										location.pathname
									)}
									drawerStateChangedTo={
										this.drawerStateChanged
									}
									userSelectorShown={() =>
										this.getUserPage(location.pathname)
									}
									onPageChange={(destination) =>
										this.switchUserPageTo(
											destination,
											location.pathname,
											history
										)
									}
									onLogout={() => this.onNotLoggedIn(history)}
								>
									<UserList
										users={this.state.users}
										viewType={this.getUserDetailsViewType()}
									/>
								</TopBar>
							}
						</Grid>
						<div className="cs142-main-topbar-buffer" />
						<Grid item style={{ marginLeft: dataMarginLeft }}>
							<Switch>
								<Route
									exact
									path="/"
									render={() => (
										<Typography variant="body1">
											Welcome to your photosharing app!
											This{" "}
											<a href="https://material-ui.com/demos/paper/">
												Paper
											</a>{" "}
											component displays the main content
											of the application. The {"sm={9}"}{" "}
											prop in the{" "}
											<a href="https://material-ui.com/layout/grid/">
												Grid
											</a>{" "}
											item component makes it responsively
											display 9/12 of the window. The
											Switch component enables us to
											conditionally render different
											components to this part of the
											screen. You don&apos;t need to
											display anything here on the
											homepage, so you should delete this
											Route component once you get
											started.
										</Typography>
									)}
								/>
								<Route
									path="/users/:userId"
									render={(props) => {
										console.log(
											"Route currently at users/:userid"
										);
										let user = this.getUser(
											props.match.params.userId
										);
										if (!this.isLoggedIn()) {
											return <Link to="/login" />;
										}
										return (
											<UserDetail
												user={user}
												photos={this.getUserPhotos(
													user._id
												)}
												viewType={"full"}
												{...props}
											/>
										);
									}}
								/>
								<Route
									path="/photos/:userId"
									render={(props) => {
										let user = this.getUser(
											props.match.params.userId
										);
										if (!this.isLoggedIn()) {
											return <Link to="/login" />;
										}
										return (
											<UserDetail
												user={user}
												photos={this.getUserPhotos(
													user._id
												)}
												viewType={"full"}
												{...props}
											/>
										);
									}}
								/>
								<Route
									path="/users"
									render={() => {
										if (!this.isLoggedIn()) {
											return <Link to="/login" />;
										}
										return (
											<UserList
												users={this.state.users}
												viewType={"avatarName"}
											/>
										);
									}}
								/>
								<Route
									path="/login"
									render={() => (
										<Login
											onLogin={() => history.push("/")}
										/>
									)}
								/>
								<Route
									path="/register"
									render={() => <Register />}
								/>
								<Route
									path="*"
									render={() => <Redirect to="/login" />}
								/>
							</Switch>
						</Grid>
					</Grid>
				</div>
			</HashRouter>
		);
	}
}

const PhotoShareWithRouter = withRouter(PhotoShare);

ReactDOM.render(
	<HashRouter>
		<PhotoShareWithRouter />
	</HashRouter>,
	document.getElementById("photoshareapp")
);
