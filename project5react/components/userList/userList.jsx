import React from "react";
import { List, ListItem, makeStyles } from "@material-ui/core";
import "./userList.css";
import UserDetail from "../userDetail/userDetail";
import { Link } from "react-router-dom";
import { fetchUserPhotos } from "../../WebFetcher.js";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
    };
  }

  getUsers() {
    let photosLoc = "../../images/";
    let userViews = this.state.users.map((user, indx) => {
      user.photo =
        photosLoc + fetchUserPhotos(user._id)[0].file_name;
      return (
        <Link to={"/users/" + user._id} key={user._id}>
          <ListItem>
            <UserDetail user={user} viewType={this.props.viewType} />
          </ListItem>
        </Link>
      );
    });
    console.log(userViews);
    return <List>{userViews}</List>;
  }

  render() {
    return this.getUsers();
  }
}

export default UserList;
