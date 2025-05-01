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
        console.log("User profile:", data); // ✅ check browser console
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

  return (
    <Grid container direction="column" alignItems="center" spacing={2} style={{ marginTop: "50px" }}>
      <Grid item>
        <Avatar src={userData.image_url} alt="Profile" sx={{ width: 100, height: 100 }} />
      </Grid>
      <Grid item>
        <Typography variant="h5">{userData.display_name}</Typography>
        <Typography variant="subtitle1">Top Artist: {userData.top_artist}</Typography>
      </Grid>
    </Grid>
  );
}
