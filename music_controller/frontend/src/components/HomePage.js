// src/components/HomePage.js

import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import PrivacyPolicy from "./PrivacyPolicy";
import SpotifyStatsPage from "./SpotifyStatsPage";
import { Link } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { roomCode: null };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  componentDidMount() {
    fetch("/api/user-in-room")
      .then((res) => res.json())
      .then((data) => this.setState({ roomCode: data.code }));
  }

  renderHomePage() {
    return (
      <>
        {/* ◀︎ Moved disclaimer to its own Grid at top */}
        <Grid
          container
          justifyContent="center"
          style={{ marginTop: "1rem", padding: "0 1rem" }}
        >
          <Grid item xs={12}>
            <Typography
              variant="body2"
              align="center"
              style={{
                backgroundColor: "#fff3cd",
                border: "1px solid #ffeeba",
                padding: "0.5rem",
                borderRadius: "4px",
              }}
            >
              Project is currently pending Spotify Dev Team approval for public
              API access. To access features email me at{" "}
              <a href="mailto:max8alton@gmail.com">max8alton@gmail.com</a> to
              be added to the user list. Visit{" "}
              <a
                href="https://developer.spotify.com/documentation/web-api/concepts/quota-modes"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{" "}
              for more information.
            </Typography>
          </Grid>
        </Grid>

        {/* Everything below stays in the centered container */}
        <div className="centered-page scaled-ui">
          <Grid container spacing={3}>
            <Grid item xs={12} align="center">
              <Typography className="title-text">House Party</Typography>
            </Grid>

            <Grid item xs={12} align="center">
              <ButtonGroup
                disableElevation
                variant="contained"
                color="primary"
              >
                <Button color="primary" to="/join" component={Link}>
                  Join a Room
                </Button>
                <Button color="secondary" to="/create" component={Link}>
                  Create a Room
                </Button>
                <Button color="success" to="/stats" component={Link}>
                  View Stats
                </Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs={12} align="center">
              <Button
                variant="outlined"
                color="secondary"
                to="/privacy"
                component={Link}
                style={{
                  marginTop: "20px",
                  color: "white",
                  borderColor: "white",
                }}
              >
                Privacy Policy
              </Button>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }

  clearRoomCode() {
    this.setState({ roomCode: null });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.state.roomCode ? (
                <Redirect to={`/room/${this.state.roomCode}`} />
              ) : (
                this.renderHomePage()
              )
            }
          />
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route path="/stats" component={SpotifyStatsPage} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route
            path="/room/:roomCode"
            render={(props) => (
              <Room {...props} leaveRoomCallback={this.clearRoomCode} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
