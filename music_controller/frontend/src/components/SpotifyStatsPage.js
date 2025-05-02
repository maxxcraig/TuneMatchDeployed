import React, { useEffect, useState } from "react";
import { Grid, Typography, Avatar, CircularProgress } from "@mui/material";

export default function SpotifyStatsPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/spotify/user-profile")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }
        return res.json();
      })
      .then((data) => {
        console.log("User profile:", data);
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
        <Typography variant="h6" color="error">Error: {error}</Typography>
      </Grid>
    );
  }

  const backgroundImage = userData.top_artist_image;

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      style={{
        minHeight: "100vh",
        paddingTop: "40px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(4px)",
        color: "white", // ensures text is readable
        textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
      }}
      spacing={3}
    >
      <Grid item>
        <Avatar
          src={userData.image_url}
          alt="Profile"
          sx={{ width: 150, height: 150 }}
        />
      </Grid>

      <Grid item>
        <Typography variant="h4" fontWeight="bold">
          {userData.display_name}
        </Typography>
      </Grid>

      <Grid item style={{ textAlign: "center" }}>
        <Typography variant="h6">Top Artist: {userData.top_artist}</Typography>
        <Typography variant="h6">Top Song: {userData.top_song}</Typography>
        <Typography variant="h6">Minutes Listened To Top Song: {userData.minutes_listened}</Typography>
        <Typography variant="h6">Top Genre: {userData.top_genre}</Typography>
      </Grid>
    </Grid>
  );
}
