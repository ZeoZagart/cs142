import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Grid, LinearProgress, Paper } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { registerUser } from "../../WebFetcher.js";
import { Redirect } from "react-router";

export default function Register() {
	const [registered, setRegistered] = React.useState(false);
	if (registered) {
		return <Redirect to="/" />;
	}
	return (
		<Formik
			initialValues={{
				first_name: "",
				last_name: "",
				email: "",
				password: "",
			}}
			validate={(values) => {
				const errors = {};
				if (!values.first_name) {
					errors.first_name = "Required";
				} else if (!/^[A-Z]+/i.test(values.first_name)) {
					errors.first_name = "Only A-Z, a-z are allowed in name";
				}
				if (!values.last_name) {
					errors.last_name = "Required";
				} else if (!/^[A-Z]+/i.test(values.first_name)) {
					errors.last_name = "Only A-Z, a-z are allowed in name";
				}
				if (!values.email) {
					errors.email = "Required";
				} else if (
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
						values.email
					)
				) {
					errors.email = "Invalid email address";
				}
				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				registerUser(
					values.email,
					values.first_name,
					values.last_name,
					values.password
				)
					.then((user) => setRegistered(true))
					.catch((err) => console.log(`Error registering: ${err}`));
				setTimeout(() => {
					setSubmitting(false);
				}, 500);
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Field
						component={TextField}
						name="first_name"
						type="text"
						label="first name"
					/>
					<Field
						component={TextField}
						type="text"
						label="last name"
						name="last_name"
					/>
					<Field
						component={TextField}
						name="email"
						type="email"
						label="Email"
					/>
					<Field
						component={TextField}
						type="password"
						label="Password"
						name="password"
					/>
					{isSubmitting && <LinearProgress />}
					<Button
						variant="contained"
						color="primary"
						disabled={isSubmitting}
						onClick={submitForm}
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
	);
}
