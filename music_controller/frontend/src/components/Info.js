import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

export default function Info() {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return "Join a room using a unique code to start listening with others in real-time.";
  }

  function createInfo() {
    return "Create a room to host your own listening session and control playback for everyone.";
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          What is House Party?
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() =>
            setPage(page === pages.CREATE ? pages.JOIN : pages.CREATE)
          }
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="secondary"
          variant="contained"
          to="/"
          component={Link}
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
