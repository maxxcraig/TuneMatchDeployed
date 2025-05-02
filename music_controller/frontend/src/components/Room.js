import React, { Component } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      userInfo: null,
      isHost: false,
      showSettings: false,
      spotifyAuthenticated: false,
      song: {},
    };
    this.roomCode = this.props.match.params.roomCode;

    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
    this.getCurrentSong = this.getCurrentSong.bind(this);

    this.getRoomDetails();
  }

  componentDidMount() {
    this.interval = setInterval(this.getCurrentSong, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(this.getCurrentSong, 1000);
  
    fetch("/spotify/user-profile")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ userInfo: data });
      });
  }
  

  getRoomDetails() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        if (data.is_host) {
          this.authenticateSpotify();
        }
      });
  }

  authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ spotifyAuthenticated: data.status });
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  getCurrentSong() {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok || response.status === 204) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ song: data });
      });
  }


  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });
  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    });
  }

  renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={this.state.votesToSkip}
            guestCanPause={this.state.guestCanPause}
            roomCode={this.roomCode}
            updateCallback={this.getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }

  render() {
    if (this.state.showSettings) {
      return this.renderSettings();
    }
  
    return (
      <Grid container spacing={1}>
        {/* Top-right profile image only */}
        {this.state.userInfo && (
          <img
            src={this.state.userInfo.image_url}
            alt="Profile"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              height: "70px", 
              width: "70px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
  
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4" className="title-text">
            Code: {this.roomCode}
          </Typography>
        </Grid>
  
        <MusicPlayer {...this.state.song} />
  
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  fetch("/spotify/skip", { method: "POST" });
                }}
                style={{ minWidth: "150px" }}
              >
                Vote to Skip
              </Button>
            </Grid>
            {this.state.isHost ? (
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.updateShowSettings(true)}
                  style={{ minWidth: "150px" }}
                >
                  Settings
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={this.leaveButtonPressed}
                style={{ minWidth: "150px" }}
              >
                Leave Room
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  


}
  
    