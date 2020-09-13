import React from "react";
import { Redirect } from "react-router-dom";
import { List, ListItem, makeStyles } from "@material-ui/core";
import "./userList.css";
import UserDetail from "../userDetail/userDetail";
import { Link } from "react-router-dom";
import { fetchUserPhotos, isLoggedIn } from "../../WebFetcher.js";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
	getUsers() {
		let photosLoc = "../../images/";
		let userViews = this.props.users.map((user, indx) => {
			user.photo = photosLoc + fetchUserPhotos(user._id)[0].file_name;
			return (
				<Link to={"/users/" + user._id} key={user._id}>
					<ListItem>
						<UserDetail
							user={user}
							viewType={this.props.viewType}
						/>
					</ListItem>
				</Link>
			);
		});
		return <List>{userViews}</List>;
	}

	render() {
		if (!isLoggedIn()) return <Redirect to="login" />;
		return this.getUsers();
	}
}

export default UserList;
