import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Grid, Typography, Paper, Slide } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
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
    return this.state.drawerStateOpen ? "avatarName" : "avatar";
  }

  getUserPhotos() {
    return window.cs142models.photoOfUserModel()
  }

  render() {
    let dataMarginLeft = this.state.drawerStateOpen ? 500 : 150;
    return (
      <HashRouter>
        <div>
          <Grid container spacing={8} direction="column">
            <Grid item>
              <TopBar drawerStateChangedTo={this.drawerStateChanged}>
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
                    let user = this.state.users.find(
                      (value) => value._id === props.match.params.userId
                    );
                    return <UserDetail user={user} photos={this.getUserPhotos()} viewType={"full"} />;
                  }}
                />
                <Route
                  path="/photos/:userId"
                  render={(props) => <UserPhotos {...props} />}
                />
                <Route path="/users" component={UserList} />
              </Switch>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));
