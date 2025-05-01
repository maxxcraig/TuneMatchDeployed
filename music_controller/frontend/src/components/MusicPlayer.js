import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  IconButton,
  LinearProgress,
  Button,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function MusicPlayer(props) {
  const [hasVoted, setHasVoted] = useState(false);

  // Reset vote status when a new song plays
  useEffect(() => {
    if (props?.id) {
      setHasVoted(false);
    }
  }, [props?.id]);

  // Nothing playing yet
  if (!props || !props.title) {
    return (
      <Grid container align="center">
        <Grid item xs={12}>
          <Typography variant="h6">
            Waiting for host to play music...
          </Typography>
        </Grid>
      </Grid>
    );
  }

  const songProgress = (props.time / props.duration) * 100;

  const pauseSong = () => {
    fetch("/spotify/pause", { method: "PUT" });
  };

  const playSong = () => {
    fetch("/spotify/play", { method: "PUT" });
  };

  const skipSong = () => {
    fetch("/spotify/skip", { method: "POST" });
    setHasVoted(true);
  };

  return (
    <Grid container align="center" spacing={1}>
      <Grid item xs={12}>
        <img src={props.image_url} height="300px" alt="Album Cover" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="subtitle1">{props.artist}</Typography>
      </Grid>
      <Grid item xs={12}>
        <IconButton onClick={props.is_playing ? pauseSong : playSong}>
          {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton onClick={skipSong}>
          <SkipNextIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <LinearProgress variant="determinate" value={songProgress} />
        <Typography variant="caption">
          Votes: {props.votes} / {props.votes_required}
        </Typography>
      </Grid>
    </Grid>
  );
}
