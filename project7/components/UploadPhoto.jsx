import React, { useRef, useState } from "react";
import { Button, CardMedia, Dialog, Grid } from "@material-ui/core";
import { CheckOutlined, ClearOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { uploadPhoto } from "../WebFetcher.js";

const useStyles = makeStyles((theme) => ({
	container: {
		margin: 0,
		padding: 0,
		width: "36rem",
		height: "30rem",
	},
	choosePhotoGridItem: {
		margin: "auto",
	},
	selectOrRejectPhoto: {
		overflow: "hidden",
		margin: 0,
		padding: 0,
		width: "36rem",
		height: "30rem",
	},
	openPhoto: {
		margin: 0,
		padding: 0,
		width: "30rem",
		height: "30rem",
	},
	selectOrRejectOptions: {
		width: "6rem",
	},
}));

export default function UploadPhoto(props) {
	const classes = useStyles();
	const [image, setImage] = useState({ preview: null, raw: null });
	const chooseFileRef = useRef();

	const onPhotoChosen = (event) => {
		if (event.target.files.length) {
			setImage({
				preview: URL.createObjectURL(event.target.files[0]),
				raw: event.target.files[0],
			});
		}
	};

	const selectPhoto = () => {
		let photo = new FormData();
		photo.append("uploadedphoto", image.raw);
		uploadPhoto(photo);
		props.onClose();
	};

	const rejectPhoto = () => {
		setImage({
			preview: null,
			raw: null,
		});
	};

	const selectOrRejectPhoto = () => {
		return (
			<Grid
				container
				direction="row"
				className={classes.selectOrRejectPhoto}
			>
				<Grid item className={classes.openPhoto}>
					<CardMedia
						component="img"
						image={image.preview}
						title="Selected photo"
						className={classes.openPhoto}
					/>
				</Grid>
				<Grid
					container
					direction="column"
					justify="space-around"
					alignContent="center"
					className={classes.selectOrRejectOptions}
				>
					<Button>
						<CheckOutlined
							label="Clickable"
							style={{ color: "#95eb34", fontSize: 50 }}
							onClick={() => selectPhoto()}
						/>
					</Button>
					<Button>
						<ClearOutlined
							label="Clickable"
							style={{ color: "#eb346e", fontSize: 50 }}
							onClick={() => rejectPhoto()}
						/>
					</Button>
				</Grid>
			</Grid>
		);
	};

	const choosePhotoButtton = () => {
		console.log("Choose photo  button is being shown");
		return (
			<Grid item className={classes.choosePhotoGridItem}>
				<input
					type="file"
					accept="image/*"
					style={{ display: "none" }}
					onChange={onPhotoChosen}
					ref={chooseFileRef}
				/>
				<Button
					onClick={() => chooseFileRef.current.click()}
					color="secondary"
					variant="outlined"
				>
					Select photo
				</Button>
			</Grid>
		);
	};

	const currentView = () => {
		console.log(
			`Upload photo dialog showing currentView for: ${image.preview} : ${image.raw}`
		);
		if (image.preview) {
			return selectOrRejectPhoto();
		} else {
			return choosePhotoButtton();
		}
	};

	console.log("Open state value: " + open);
	return (
		<Dialog open={true} onClose={() => props.onClose()} maxWidth={false}>
			<Grid container direction="row" className={classes.container}>
				{currentView()}
			</Grid>
		</Dialog>
	);
}
