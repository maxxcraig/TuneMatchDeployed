import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function PrivacyPolicy() {
  const history = useHistory();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", padding: "20px", textAlign: "center" }}
    >
      <Grid item>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          TuneMatch collects data from your Spotify account to provide personalized music stats, room voting functionality, and music control features.
          We access your top artists, top tracks, and playback state to enhance your experience within the application.
          Your data is not shared with third parties and is only used to provide core functionality within TuneMatch.
        </Typography>
        <Typography variant="body1" paragraph>
          By logging in with Spotify, you consent to the use of this data for the stated purposes. 
          You can revoke access at any time through your Spotify account settings.
        </Typography>
      </Grid>

      <Grid item>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => history.push("/")}
        >
          Back to Home
        </Button>
      </Grid>
    </Grid>
  );
} 