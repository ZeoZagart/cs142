import React from "react";
import { Grid, Typography, Avatar } from "@material-ui/core";

class CommentView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let name = this.props.name;
		let avatar = this.props.photo;
		let comment = this.props.comment;
		console.log(`name : ${name} : photo : ${avatar}`);
		return (
			<Grid
				container
				direction="row"
				spacing={2}
				style={{ width: "350px" }}
			>
				<Grid item>
					<Avatar alt={name} src={avatar} />
				</Grid>
				<Grid
					item
					xs
					container
					direction="column"
					spacing={1}
					align="left"
				>
					<Typography
						color="secondary"
						variant="body1"
						style={{ paddingTop: "4px" }}
					>
						{name}
					</Typography>
					<Typography color="textSecondary" style={{}}>
						{comment}
					</Typography>
				</Grid>
			</Grid>
		);
	}
}

export default CommentView;
