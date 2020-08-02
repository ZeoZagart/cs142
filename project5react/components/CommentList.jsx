import React from "react";
import { List, ListItem, Divider } from "@material-ui/core";
import CommentView from "./CommentView";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  getUsers() {
    const classes = this.useStyles();
    let photosLoc = "../../images/";
    let userViews = this.state.users.map((user, indx) => {
      user.photo =
        photosLoc + window.cs142models.photoOfUserModel(user._id)[0].file_name;
      return (
        <Link to={"/users/" + user._id} key={user._id}>
          <ListItem>
            <UserDetail user={user} viewType={this.props.viewType} />
          </ListItem>
        </Link>
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
    let { classes } = this.props;
    const photosBase = this.props.imagesPath;
    const comments = this.props.comments.map((comment) => {
      comment.photo = photosBase + comment.photo;
      return comment;
    });
    console.log(comments);
    let commentsView = comments.map((comment, idx) => {
      return (
        <Link to={"/users/" + comment.userId} key={idx}>
          <ListItem>
            <CommentView
              name={comment.name}
              photo={comment.photo}
              comment={comment.text}
            />
          </ListItem>
        </Link>
      );
    });
    return <List className={classes.commentListStyle}>{commentsView}</List>;
  }
}

const styles = (theme) => ({
  commentListStyle: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
});

export default withStyles(styles)(CommentList);
