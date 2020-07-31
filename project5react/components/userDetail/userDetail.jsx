import React from "react";
import { Paper, Grid, Typography, Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let user = this.props.user;
    console.log("viewType : " + this.props.viewType);
    switch (this.props.viewType) {
      case "avatar":
        return this.avatarOnly(user);
      case "avatarName":
        return this.avatarName(user);
      default:
        return this.completeProfile(user);
    }
  }

  getLongText() {
    let largeList = [];
    let largeSize = 100;
    for (var i = 0; i < largeSize; i++) {
      largeList.push(i);
    }
    return largeList.map((item) => (
      <Typography key={item}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non illo amet
        quaerat deleniti ipsa eligendi. Corporis fuga, necessitatibus illo porro
        dolore cum, delectus quo enim ipsam amet omnis nam veritatis?
      </Typography>
    ));
  }

  completeProfile(user) {
    let allPhotos = this.props.photos;
    let name = user.first_name + " " + user.last_name;
    let { classes } = this.props;
    return (
      <Grid container direction="column" spacing={3} className={classes.root}>
        <Grid>
          <Avatar alt={name} src={user.photo} className={classes.avatar} />
        </Grid>
        <Paper className={classes.paper}>
          <Grid container spacing={6} className={classes.aboutUser}>
            <Typography variant="h4" color="secondary">
              {name}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    );
  }

  avatarName(user) {
    let name = user.first_name + " " + user.last_name;
    return (
      <Grid container direction="row" spacing={2} style={{ width: "350px" }}>
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
    width: 140,
    height: 140,
    top: 70,
  },
  paper: {
    width: "100%",
    textAlign: "center",
    borderRadius: 15,
  },
  aboutUser: {
    marginTop: 80,
  },
});

export default withStyles(styles)(UserDetail);
