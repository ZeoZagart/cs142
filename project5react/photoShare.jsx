import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import "./styles/main.css";

// import necessary components
import TopBar from "./components/topBar/TopBar";
import UserDetail from "./components/userDetail/UserDetail";
import UserList from "./components/userList/UserList";
import UserPhotos from "./components/userPhotos/UserPhotos";

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: window.cs142models.userListModel(),
      drawerStateOpen: false,
    };
    this.drawerStateChanged = this.drawerStateChanged.bind(this);
    this.getUserDetailsViewType = this.getUserDetailsViewType.bind(this);
  }

  drawerStateChanged(isOpen) {
    this.setState({
      drawerStateOpen: isOpen,
    });
  }

  getUserDetailsViewType() {
    return this.state.drawerStateOpen === true ? "avatarName" : "avatar";
  }

  getUserPhotos(userId) {
    let base = "../../images/";
    let photos = window.cs142models.photoOfUserModel(userId).map((photo) => {
      photo.src = base + photo.file_name;
      return photo;
    });
    return photos;
  }

  getUser(id) {
    return this.state.users.find((user) => user._id === id)
  }

  getUserName(id) {
    let user = this.getUser(id);
    let name = user.first_name + " " + user.last_name;
    return name;
  }

  getPageName(location) {
    let splits = location.split('/').filter(it => it.length > 0);
    if (splits.length == 0) return "Home";
    if (splits.length == 1) {
      if (splits.includes("users")) return "All users";
      else return "404 NOT FOUND";
    }
    let userId = splits[1];
    let userName = this.getUserName(userId);
    if (splits.length == 2) {
      if (splits.includes("users")) {
        return userName;
      } else {
        return userName + "'s photos";
      }
    }
  }

  render() {
    let dataMarginLeft = this.state.drawerStateOpen ? 500 : 150;
    const { location } = this.props;
    return (
      <HashRouter>
        <div>
          <Grid container spacing={8} direction="column">
            <Grid item>
              <TopBar pageName={this.getPageName(location.pathname)} drawerStateChangedTo={this.drawerStateChanged}>
                <UserList
                  users={this.state.users}
                  viewType={this.getUserDetailsViewType()}
                />
              </TopBar>
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item style={{ marginLeft: dataMarginLeft }}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Typography variant="body1">
                      Welcome to your photosharing app! This{" "}
                      <a href="https://material-ui.com/demos/paper/">Paper</a>{" "}
                      component displays the main content of the application.
                      The {"sm={9}"} prop in the{" "}
                      <a href="https://material-ui.com/layout/grid/">Grid</a>{" "}
                      item component makes it responsively display 9/12 of the
                      window. The Switch component enables us to conditionally
                      render different components to this part of the screen.
                      You don&apos;t need to display anything here on the
                      homepage, so you should delete this Route component once
                      you get started.
                    </Typography>
                  )}
                />
                <Route
                  path="/users/:userId"
                  render={(props) => {
                    let user = this.getUser(props.match.params.userId)
                    return (
                      <UserDetail
                        user={user}
                        photos={this.getUserPhotos(user._id)}
                        viewType={"full"}
                      />
                    );
                  }}
                />
                <Route
                  path="/photos/:userId"
                  render={(props) => <UserPhotos {...props} />}
                />
                <Route
                  path="/users"
                  render={() => (
                    <UserList
                      users={this.state.users}
                      viewType={"avatarName"}
                    />
                  )}
                />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

const PhotoShareWithRouter = withRouter(PhotoShare);

ReactDOM.render(<HashRouter><PhotoShareWithRouter /></HashRouter>, document.getElementById("photoshareapp"));
