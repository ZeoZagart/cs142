import React from "react";
import {
  Paper,
  Grid,
  Typography,
  Avatar,
  makeStyles,
  Container,
  Card,
  Button,
} from "@material-ui/core";
import "./userDetail.css";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let user = this.props.user;
    let name = user.first_name + " " + user.last_name;
    return (
      <Button variant="outlined" color="primary" fullWidth spacing={3} style={{minWidth:"200px"}}>
        <Grid container spacing={2} alignContent="center">
          <Grid item>
            <Avatar alt={name} src={user.photo} />
          </Grid>
          <Grid item xs container direction="column" spacing={2} alignItems="flex-start">
            <Typography variant="subtitle1">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.description} 
            </Typography>
          </Grid>
        </Grid>
      </Button>
    );
  }
}

export default UserDetail;
