import React from "react";
import { Redirect } from "react-router-dom";
import { List, ListItem, makeStyles } from "@material-ui/core";
import "./userList.css";
import UserDetail from "../userDetail/userDetail";
import { Link } from "react-router-dom";
import { isLoggedIn, getPhoto } from "../../WebFetcher.js";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
	getUsers() {
		let userViews = this.props.users.map((user, indx) => {
			user.photo = getPhoto(user._id);
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
