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
		console.log("Comment list is being re-rendered");
		let { classes } = this.props;
		const photosBase = this.props.imagesPath;
		const comments = this.props.comments.map((comment) => {
			comment.photo = photosBase + comment.photo;
			return comment;
		});
		let commentsView = comments.map((comment, idx) => {
			return (
				<Link
					to={"/users/" + comment.userId}
					key={idx}
					style={{ textDecoration: "none" }}
				>
					<ListItem style={{ margin: 0 }}>
						<CommentView
							name={comment.name}
							photo={comment.photo}
							comment={comment.text}
							style={{ margin: 0, padding: 0 }}
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
	},
});

export default withStyles(styles)(CommentList);
