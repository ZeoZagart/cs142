import React from "react";
import {
	Paper,
	TextField,
	Typography,
	Button,
	FormControl,
	InputLabel,
	FilledInput,
	InputAdornment,
	IconButton,
	Grid,
} from "@material-ui/core";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { login } from "../../WebFetcher.js";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			showPassword: false,
			incorrectUsernameOrPassword: false,
		};
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
		this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
		this.submit = this.submit.bind(this);
	}

	submit(event) {
		let username = this.state.username;
		let password = this.state.password;
		login(username, password)
			.then((user) => {
				this.setIncorrectUsernameOrPassword(false);
				this.props.onLogin();
				console.log("Logged in successfully");
			})
			.catch((err) => {
				if (err.response) {
					this.logLoginError(username, err.response);
					this.setIncorrectUsernameOrPassword(true);
				} else {
					this.logLoginError(username, err);
				}
			});
	}

	logLoginError(username, err) {
		console.log(`Failed to log-in user ${username}: ${err}`);
	}

	setIncorrectUsernameOrPassword(value) {
		this.setState({
			incorrectUsernameOrPassword: value,
		});
	}

	handleUsernameChange(event) {
		this.setState({
			username: event.target.value,
		});
	}

	handlePasswordChange(event) {
		this.setState({
			password: event.target.value,
		});
	}

	handleClickShowPassword() {
		this.setState({
			showPassword: !this.state.showPassword,
		});
	}

	handleMouseDownPassword(event) {
		// event.preventDefault();
	}

	getPasswordButton() {
		const { classes } = this.props;
		let visibilityIcon = <Visibility />;
		if (this.state.showPassword) {
			visibilityIcon = <VisibilityOff />;
		}
		return (
			<FormControl variant="filled" className={classes.password}>
				<InputLabel htmlFor="filled-adornment-password">
					Password
				</InputLabel>
				<FilledInput
					required
					id="filled-adornment-password"
					type={this.state.showPassword ? "text" : "password"}
					value={this.state.password}
					onChange={this.handlePasswordChange}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={this.handleClickShowPassword}
								onMouseDown={this.handleMouseDownPassword}
								edge="end"
							>
								{visibilityIcon}
							</IconButton>
						</InputAdornment>
					}
					labelWidth={70}
				/>
			</FormControl>
		);
	}

	showIncorrectUsernameOrPassword() {
		const { classes } = this.props;
		return (
			<Typography className={classes.incorrectInfo} color={"red"}>
				* Incorrect Username or Password
			</Typography>
		);
	}

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.paper}>
				<Grid container direction="column" className={classes.grid}>
					{this.state.incorrectUsernameOrPassword &&
						this.showIncorrectUsernameOrPassword()}
					<TextField
						required
						error={this.state.incorrectUsernameOrPassword}
						variant="filled"
						label="Username"
						className={classes.username}
						onChange={this.handleUsernameChange}
					/>
					{this.getPasswordButton()}
					<Button
						variant="contained"
						className={classes.loginButton}
						onClick={this.submit}
					>
						Login
					</Button>
				</Grid>
			</Paper>
		);
	}
}

const styles = (theme) => ({
	paper: {
		margin: "auto",
		borderRadius: "2rem",
		width: "30rem",
	},
	grid: {
		alignContent: "center",
		alignItems: "center",
		padding: "5rem",
	},
	username: {
		width: "20rem",
		marginBottom: "1rem",
	},
	password: {
		width: "20rem",
		marginBottom: "1rem",
	},
	incorrectInfo: {
		color: "red",
	},
	loginButton: {
		width: "5rem",
		color: "white",
		backgroundColor: "#f50057",
		marginBottom: "1rem",
		"&:hover": {
			backgroundColor: "#e50045",
		},
	},
});

export default withStyles(styles)(Login);
