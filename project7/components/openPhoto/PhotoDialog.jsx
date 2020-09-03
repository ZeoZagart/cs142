import React from "react";
import { Grid, CardMedia, Dialog } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CommentList from "../CommentList";
import { fetchUserById, fetchUserPhotos } from "../../WebFetcher.js";

class PhotoDialog extends React.Component {
	getUserPhoto = (userId) => fetchUserPhotos(userId)[0].file_name;

	getUserById = (userId) => fetchUserById(userId);

	getCommentsOnPhoto(photo) {
		let allComments = photo.comments;
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

	getPhotoDialog(name, openPhoto) {
		let { classes } = this.props;
		let altText = name + "'s photo";
		let comments = this.getCommentsOnPhoto(openPhoto);
		let imagesPath = "../../images/";
		return (
			<Grid
				container
				direction="row"
				className={classes.photoAndComments}
			>
				<Grid xs className={classes.openPhoto}>
					<CardMedia
						component="img"
						image={openPhoto.src}
						title={altText}
						className={classes.openPhoto}
					/>
				</Grid>
				<Grid
					xs
					align="left"
					zeroMinWidth
					className={classes.photoComments}
				>
					<CommentList comments={comments} imagesPath={imagesPath} />
				</Grid>
			</Grid>
		);
	}

	render() {
		let name = this.props.name;
		let photo = this.props.photo;
		console.log("Showing photo dialog for user : " + name + " and photo");
		console.log(photo);
		return (
			<Dialog
				zeroMinWidth
				open={true}
				onClose={() => this.props.onClose()}
			>
				{this.getPhotoDialog(name, photo)}
			</Dialog>
		);
	}
}

const styles = (theme) => ({
	photoAndComments: {
		maxHeight: "20rem",
	},
	openPhoto: {
		width: "20rem",
		height: "20rem",
	},
	photoComments: {
		width: "20rem",
		maxHeight: "20rem",
	},
});

export default withStyles(styles)(PhotoDialog);
