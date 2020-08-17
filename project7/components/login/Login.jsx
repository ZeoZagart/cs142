import React from "react";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
		this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
		this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
	}

	submit() {
		
	}

	handlePasswordChange(event) {
		this.setState({
			password: event.target.value,
		});
	}

	handleClickShowPassword() {
		this.setState({
			showPassword: !showPassword,
		});
	}

	handleMouseDownPassword(event) {
		// event.preventDefault();
    }

	getPasswordButton() {
		let values = this.state
		return (
			<FormControl
				className={clsx(classes.margin, classes.textField)}
				variant="filled"
			>
				<InputLabel htmlFor="filled-adornment-password">
					Password
				</InputLabel>
                <FilledInput
					required
					id="filled-adornment-password"
					type={values.showPassword ? "text" : "password"}
					value={values.password}
					onChange={this.handlePasswordChange}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={this.handleClickShowPassword}
								onMouseDown={this.handleMouseDownPassword}
								edge="end"
							>
								{values.showPassword ? (
									<Visibility />
								) : (
									<VisibilityOff />
								)}
							</IconButton>
						</InputAdornment>
					}
					labelWidth={70}
				/>
			</FormControl>
		);
	}

	showIncorrectUsernameOrPassword() {
		const { classses } = this.props;
		return (
			<Typography className={classes.incorrectInfo}>
				* Incorrect Username or Password
			</Typography>
		);
	}

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.root}>
				<TextField required label="Username" />
				{this.getPasswordButton()}
				<Button variant="contained" className={classes.loginButton} onClick={this.submit}>
					Login
				</Button>
			</Paper>
		);
	}
}

const styles = (theme) => ({
	root: {
		alignSelf: "center",
		alignItems: "center",
		borderRadius: "5rem",
	},
	incorrectInfo: {
		color: "red",
	},
	loginButton: {
		color="secondary",
	},
});

export default withStyles(styles)(Login);
