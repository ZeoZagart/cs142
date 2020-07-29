import React from "react";
import {
  Grid,
  Typography,
  Avatar,
} from "@material-ui/core";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let user = this.props.user;
    return this.props.minified == true ? this.minifiedView(user) : this.fullView(user)
  }

  fullView(user) {
    let name = user.first_name + " " + user.last_name;
    return (
        <Grid container spacing={2} alignContent="center" spacing={3} style={{minWidth:"200px"}}>
          <Grid item>
            <Avatar alt={name} src={user.photo} />
          </Grid>
          <Grid item xs container direction="column" spacing={1} align="left">
            <Typography variant="body1" style={{textTransform:"none", paddingTop:"4px"}}>
              {name}
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{textTransform:"none"}}>
              {user.description} 
            </Typography>
          </Grid>
        </Grid>
    );
  }

  minifiedView(user, name) {
    return (
      <Avatar alt={name} src={user.photo} />
    );
  }
}

export default UserDetail;
