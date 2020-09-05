import React from "react";
import { Grid, CardMedia, Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CommentList from "../CommentList";
import { fetchUserById, fetchUserPhotos } from "../../WebFetcher.js";
import PropTypes from "prop-types";
import PostComment from "../PostComment";

class PhotoDialog extends React.Component {
	commentEvents = null;
	constructor(props) {
		super(props);
		this.state = {
			comments: this.props.photo.comments,
		};
	}

	// componentDidMount() {
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
	// }

	addCommentToList(comment) {
		let commentList = this.state.comments;
		commentList.push(comment);
		this.setState({
			comments: commentList,
		});
	}

	// componentWillUnmount() {
	// 	if (this.commentEvents) this.commentEvents.close();
	// }

	static contextTypes = {
		router: PropTypes.object,
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

	getCommentButton(photoId) {
		return (
			<PostComment
				photoId={photoId}
				addCommentToList={(data) => this.addCommentToList(data)}
			/>
		);
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
					<Grid container align="bottom">
						{this.getCommentButton(openPhoto._id)}
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
});

export default withStyles(styles)(PhotoDialog);
