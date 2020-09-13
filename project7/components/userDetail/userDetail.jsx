import React from "react";
import { Paper, Grid, Typography, Avatar, CardMedia } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PhotoDialog from "../openPhoto/PhotoDialog";
import { getPhoto } from "../../WebFetcher.js";

class UserDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingPhotoDialog: false,
			currentPhotoInDialog: null,
		};
	}

	render() {
		let user = this.props.user;
		console.log("viewType : " + this.props.viewType);
		switch (this.props.viewType) {
			case "avatar":
				return this.avatarOnly(user);
			case "avatarName":
				return this.avatarName(user);
			case "full":
				return this.completeProfile(user);
		}
	}

	getLongText() {
		let { classes } = this.props;
		let largeList = [];
		let largeSize = 100;
		for (var i = 0; i < largeSize; i++) {
			largeList.push(i);
		}
		let p = largeList.map((item) => (
			<Typography key={item}>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
				illo amet quaerat deleniti ipsa eligendi. Corporis fuga,
				necessitatibus illo porro dolore cum, delectus quo enim ipsam
				amet omnis nam veritatis?
			</Typography>
		));

		return (
			<Typography
				variant="h4"
				color="secondary"
				className={classes.aboutUser}
			>
				{p}
			</Typography>
		);
	}

	openPhoto(photo) {
		this.setState({
			isShowingPhotoDialog: true,
			currentPhotoInDialog: photo,
		});
	}

	closePhoto() {
		this.setState({
			isShowingPhotoDialog: false,
			currentPhotoInDialog: null,
		});
	}

	getPhotosInGrid(photos, name) {
		let { classes } = this.props;
		let altText = name + "'s photo";
		return photos.map((photo, index) => {
			return (
				<Grid item key={index}>
					<CardMedia
						component="img"
						image={photo.src}
						title={altText}
						onClick={() => {
							this.openPhoto(photo);
						}}
						className={classes.sharedPhotos}
					/>
				</Grid>
			);
		});
	}

	isCurrentPagePhotos() {
		let location = this.props.location.pathname;
		console.log("LOCATION : " + location);
		return location.includes("photos");
	}

	completeProfile(user) {
		let allPhotos = this.props.photos;
		let isPhotos = this.isCurrentPagePhotos();
		let name = user.first_name + " " + user.last_name;
		let { classes } = this.props;
		if (!user.photo) {
			user.photo = getPhoto(user._id);
		}
		console.log("photos : " + allPhotos.map((photo) => photo.src));
		return (
			<React.Fragment>
				<Grid container direction="column" className={classes.root}>
					<Grid>
						<Avatar
							alt={name}
							src={user.photo}
							className={classes.avatar}
						/>
					</Grid>
					<Paper className={classes.paper}>
						<Grid
							container
							direction="column"
							alignItems="center"
							className={classes.photosContainer}
						>
							<Typography
								variant="h5"
								className={classes.userName}
							>
								{name}
							</Typography>
							<Grid container>
								{!isPhotos ? (
									<Typography
										variant="body1"
										className={classes.userName}
									>
										{user.description}
									</Typography>
								) : (
									this.getPhotosInGrid(allPhotos, name)
								)}
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				{this.state.isShowingPhotoDialog && (
					<PhotoDialog
						name={name}
						photo={this.state.currentPhotoInDialog}
						onClose={() => this.closePhoto()}
					/>
				)}
			</React.Fragment>
		);
	}

	avatarName(user) {
		let name = user.first_name + " " + user.last_name;
		return (
			<Grid
				container
				direction="row"
				spacing={2}
				style={{ width: "350px" }}
			>
				<Grid item>
					<Avatar alt={name} src={user.photo} />
				</Grid>
				<Grid
					item
					xs
					container
					direction="column"
					spacing={1}
					align="left"
					zeroMinWidth
				>
					<Typography
						variant="body1"
						style={{ textTransform: "none", paddingTop: "4px" }}
					>
						{name}
					</Typography>
					<Typography
						noWrap
						color="textSecondary"
						style={{ textTransform: "none" }}
					>
						{user.description}
					</Typography>
				</Grid>
			</Grid>
		);
	}

	avatarOnly(user, name) {
		return <Avatar alt={name} src={user.photo} />;
	}
}

const styles = (theme) => ({
	root: {
		alignItems: "center",
	},
	avatar: {
		width: "10rem",
		height: "10rem",
		top: "5rem",
	},
	paper: {
		width: "60rem",
		borderRadius: "1rem",
	},
	aboutUser: {
		marginTop: "5rem",
	},
	photosContainer: {
		margin: "auto",
		width: "42rem",
		marginTop: "5rem",
	},
	sharedPhotos: {
		width: "10rem",
		height: "10rem",
		borderRadius: "1rem",
		margin: "2rem",
	},
	userName: {},
});

export default withStyles(styles)(UserDetail);
