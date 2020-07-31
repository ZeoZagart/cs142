import React from "react";
import {
  Paper,
  Grid,
  Typography,
  Avatar,
  CardMedia,
  Card,
  GridList,
  GridListTile,
} from "@material-ui/core";
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non illo amet
        quaerat deleniti ipsa eligendi. Corporis fuga, necessitatibus illo porro
        dolore cum, delectus quo enim ipsam amet omnis nam veritatis?
      </Typography>
    ));

    return (
      <Typography variant="h4" color="secondary" className={classes.aboutUser}>
        {p}
      </Typography>
    );
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
            className={classes.sharedPhotos}
          />
        </Grid>
      );
    });
  }

  completeProfile(user) {
    let allPhotos = this.props.photos;
    let name = user.first_name + " " + user.last_name;
    let { classes } = this.props;
    console.log("photos : " + allPhotos.map((photo) => photo.src));
    return (
      <Grid container direction="column" className={classes.root}>
        <Grid>
          <Avatar alt={name} src={user.photo} className={classes.avatar} />
        </Grid>
        <Paper className={classes.paper}>
          <Grid container direction="column" alignItems="center" className={classes.photosContainer}>
            <Typography variant="h5" className={classes.userName}>{name}</Typography>
            <Grid container>
              {this.getPhotosInGrid(allPhotos, name)}
            </Grid>
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
  userName: {
    
  }
});

export default withStyles(styles)(UserDetail);
