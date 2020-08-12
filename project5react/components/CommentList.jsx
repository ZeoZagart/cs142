import React from "react";
import { List, ListItem } from "@material-ui/core";
import CommentView from "./CommentView";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { classes } = this.props;
    const photosBase = this.props.imagesPath;
    const comments = this.props.comments.map((comment) => {
      comment.photo = photosBase + comment.photo;
      return comment;
    });
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
