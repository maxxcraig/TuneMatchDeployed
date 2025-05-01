import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Link } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';

export default class CreateRoomPage extends Component {
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause,
      votesToSkip: this.props.votesToSkip,
      errorMsg: "",
      successMsg: "",
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // ✅ Now check if Spotify is authenticated
        fetch("/spotify/is-authenticated")
          .then((res) => res.json())
          .then((authData) => {
            if (!authData.status) {
              fetch("/spotify/get-auth-url")
                .then((res) => res.json())
                .then((authUrl) => {
                  window.location.replace(authUrl.url);
                });
            } else {
              this.props.history.push("/room/" + data.code);
            }
          });
      });
  }
  
  handleUpdateButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
        code: this.props.roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        this.setState({
          successMsg: "Room updated successfully!",
        });
        this.props.updateCallback(); // <--- only call it if update worked
      } else {
        this.setState({
          errorMsg: "Error updating room...",
        });
      }
    });
  }
  

  renderCreateButtons() {
    return (
      <Grid item xs={12} align="center">
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              to="/"
              component={Link}
              style={{ minWidth: "180px", fontSize: "1.1rem" }}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleRoomButtonPressed}
              style={{ minWidth: "180px", fontSize: "1.1rem" }}
            >
              Create A Room
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  
  

  renderUpdateButtons() {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleUpdateButtonPressed}
          style={{ minWidth: "180px", fontSize: "1.1rem" }}
        >
          Update Room
        </Button>
      </Grid>
    );
  }

  render() {
  const title = this.props.update ? "Update Room" : "Create a Room";

  return (
    
      <Grid container spacing={1} style={{ maxWidth: "800px" }}>
        <Grid item xs={12} align="center">
          <Collapse
            in={this.state.errorMsg !== "" || this.state.successMsg !== ""}
          >
            {this.state.successMsg !== "" ? (
              <Alert
                severity="success"
                onClose={() => {
                  this.setState({ successMsg: "" });
                }}
              >
                {this.state.successMsg}
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={() => {
                  this.setState({ errorMsg: "" });
                }}
              >
                {this.state.errorMsg}
              </Alert>
            )}
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4" className="title-text">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
      row
      defaultValue={this.props.guestCanPause.toString()}
      onChange={this.handleGuestCanPauseChange}
      style={{ justifyContent: "center", display: "flex" }}
    >
      <FormControlLabel
        value="true"
        control={<Radio color="primary" />}
        label="Play/Pause"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="false"
        control={<Radio color="secondary" />}
        label="No Control"
        labelPlacement="bottom"
      />
    </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={this.handleVotesChange}
              defaultValue={this.state.votesToSkip}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        {this.props.update
          ? this.renderUpdateButtons()
          : this.renderCreateButtons()}
      </Grid>
    
  );
}
}