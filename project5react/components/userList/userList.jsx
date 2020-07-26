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
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
      },
    }));
  }

  getUsers() {
    const classes = this.useStyles()
    let photosLoc = "../../images/";
    let userViews = this.state.users.map((user, indx) => {
      user.photo =
        photosLoc + window.cs142models.photoOfUserModel(user._id)[0].file_name;
      return (
        <ListItem key={user._id}>
          <UserDetail user={user}/>
        </ListItem>
      );
    });
    console.log(userViews);
    return <List component="nav" className={classes.userList}>{userViews}</List>;
  }

  render() {
    const classes = this.useStyles()
    return (
      <div>
        <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. You might
          choose to use <a href="https://material-ui.com/demos/lists/">Lists</a>{" "}
          and <a href="https://material-ui.com/demos/dividers">Dividers</a> to
          display your users like so:
        </Typography>
        <Divider />
        {this.getUsers()}
        <Divider />
        <Typography variant="body1">
          The model comes in from window.cs142models.userListModel()
        </Typography>
      </div>
    );
  }
}

export default UserList;
