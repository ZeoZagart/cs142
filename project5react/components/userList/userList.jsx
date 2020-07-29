import React from "react";
import {
  Divider,
  List,
  ListItem,
  Typography,
  makeStyles,
} from "@material-ui/core";
import "./userList.css";
import UserDetail from "../userDetail/userDetail";

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: window.cs142models.userListModel(),
    };
  }

  useStyles() {
    return makeStyles((theme) => ({
      root: {
        flexGrow: 1,
        overflow: "hidden",
        padding: theme.spacing(0, 3),
      },
    }));
  }

  getUsers() {
    const classes = this.useStyles();
    let photosLoc = "../../images/";
    let userViews = this.state.users.map((user, indx) => {
      user.photo =
        photosLoc + window.cs142models.photoOfUserModel(user._id)[0].file_name;
      return (
        <ListItem key={user._id}>
          <UserDetail user={user} minified={this.props.minified}/>
        </ListItem>
      );
    });
    console.log(userViews);
    return (
      <List component="nav" className={classes.userList}>
        {userViews}
      </List>
    );
  }

  render() {
    const classes = this.useStyles();
    return <React.Fragment>{this.getUsers()}</React.Fragment>;
  }
}

export default UserList;
