import React from "react";
import { isLoggedIn, submitPost } from "../WebFetcher.js";
import { Input, Button, Link, withStyles } from "@material-ui/core";

class PostCommment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentField: "",
		};
	}

	postComment() {
		console.log(
			"Submitting post for:" +
				this.state.commentField +
				" : " +
				this.props.photoId
		);
		submitPost(this.state.commentField, this.props.photoId)
			.then((response) => {
				console.log(`Comment added successfully: ${response}`);
			})
			.catch((err) => {
				if (err.response) {
					console.log(
						`Unable to comment => response: ${err.response}`
					);
				} else {
					console.log(`Unable to comment => client issue: ${err}`);
				}
			});
	}

	getCommentButton() {
		let { classes } = this.props;
		return (
			<form className={classes.postComment}>
				<Input
					value={this.state.commentField}
					onChange={(e) => {
						this.setState({ commentField: e.target.value });
					}}
					placeholder={"Your opinion?"}
					className={classes.commentField}
				/>
				<Button
					variant="contained"
					color="secondary"
					className={classes.commentButton}
					onClick={() => {
						this.postComment();
						this.setState({ commentField: "" });
					}}
				>
					POST
				</Button>
			</form>
		);
	}

	render() {
		if (isLoggedIn()) return this.getCommentButton();
		else return <Link to="/login" />;
	}
}

const styles = (theme) => ({
	postComment: {
		display: "flex",
		margin: 0,
		padding: 0,
		height: "2rem",
		width: "100%",
	},
	commentField: {
		paddingLeft: "10px",
		paddingRight: "10px",
		width: "auto",
		flexGrow: 1,
		backgroundColor: "#FAFAFA",
	},
	commentButton: {
		width: "2rem",
	},
});

export default withStyles(styles)(PostCommment);
