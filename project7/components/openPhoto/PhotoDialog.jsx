import React from "react";
import {
	Grid,
	CardMedia,
	Dialog,
	Button,
	Link,
	Input,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CommentList from "../CommentList";
import {
	fetchUserById,
	fetchUserPhotos,
	isLoggedIn,
	submitPost,
} from "../../WebFetcher.js";
import PropTypes from "prop-types";

class PhotoDialog extends React.Component {
	commentEvents = null;
	constructor(props) {
		super(props);
		this.state = {
			comments: this.props.photo.comments,
		};
		this.setPost = this.setPost.bind(this);
	}

	componentDidMount() {
		// listenForComments(this.props.photo._id).then((source) => {
		// 	this.commentEvents = source;
		// 	source.addEventListener("commentAddedEvent", (event) => {
		// 		console.log(
		// 			`Received event: CommentAdded with value: ${event}`
		// 		);
		// 		comment = JSON.parse(event.data);
		// 		this.addCommentToList(comment);
		// 	});
		// });
	}

	addCommentToList(comment) {
		let commentList = this.state.comments;
		commentList.push(comment);
		this.setState({
			comments: commentList,
		});
	}

	componentWillUnmount() {
		if (this.commentEvents) this.commentEvents.close();
	}

	static contextTypes = {
		router: PropTypes.object,
	};

	redirectToLogin = () => {
		this.context.router.history.push(`/login`);
	};

	getUserPhoto = (userId) => fetchUserPhotos(userId)[0].file_name;

	getUserById = (userId) => fetchUserById(userId);

	mapCommentsToViewable(allComments) {
		return allComments.map((comment) => {
			let user = this.getUserById(comment.user_id);
			return {
				name: user.first_name + " " + user.last_name,
				photo: this.getUserPhoto(comment.user_id),
				text: comment.comment,
				userId: comment.user_id,
			};
		});
	}

	post = "";
	setPost(event) {
		this.post = event.target.value;
	}

	postComment() {
		submitPost(this.post, this.props.photo._id)
			.then((response) => {
				console.log(`Comment added successfully: ${response}`);
				this.addCommentToList(response.data);
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
					onChange={this.setPost}
					placeholder={"Your opinion?"}
					className={classes.commentField}
				/>
				<Button
					variant="contained"
					color="secondary"
					className={classes.commentButton}
					onClick={() => {
						this.postComment();
					}}
				>
					POST
				</Button>
			</form>
		);
	}

	getCommentOrLoginButton() {
		if (isLoggedIn()) return this.getCommentButton();
		else return <Link to="/login" />;
	}

	getPhotoDialog(name, openPhoto) {
		let { classes } = this.props;
		let altText = name + "'s photo";
		let comments = this.mapCommentsToViewable(this.state.comments);
		let imagesPath = "../../images/";
		return (
			<Grid
				container
				direction="row"
				className={classes.photoAndComments}
			>
				<Grid item className={classes.openPhoto}>
					<CardMedia
						component="img"
						image={openPhoto.src}
						title={altText}
						className={classes.openPhoto}
					/>
				</Grid>
				<Grid container className={classes.commentsAndPost}>
					<Grid container className={classes.photoComments}>
						<CommentList
							comments={comments}
							imagesPath={imagesPath}
						/>
					</Grid>
					<Grid
						container
						align="bottom"
						className={classes.postComment}
					>
						{this.getCommentOrLoginButton()}
					</Grid>
				</Grid>
			</Grid>
		);
	}

	render() {
		let { classes } = this.props;
		let name = this.props.name;
		let photo = this.props.photo;
		console.log("Showing photo dialog for user : " + name + " and photo");
		console.log(photo);
		return (
			<Dialog
				className={classes.dialogBox}
				open={true}
				onClose={() => this.props.onClose()}
				maxWidth={false}
			>
				{this.getPhotoDialog(name, photo)}
			</Dialog>
		);
	}
}

const styles = (theme) => ({
	dialogBox: {},
	photoAndComments: {
		overflow: "hidden",
		margin: 0,
		padding: 0,
		width: "max-content",
		height: "20rem",
	},
	openPhoto: {
		margin: 0,
		padding: 0,
		width: "20rem",
		height: "20rem",
	},
	commentsAndPost: {
		margin: 0,
		padding: 0,
		height: "20rem",
		width: "20rem",
	},
	photoComments: {
		overflow: "auto",
		margin: 0,
		width: "100%",
		height: "18rem",
	},
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

export default withStyles(styles)(PhotoDialog);
