import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  card: {
    width: "300px",
    margin: "15px",
    float: "left",
    display: "block"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  },
  ActionBtn: {
    marginLeft: "auto"
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const date = new Date();
  const dateString =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  const timeString = date.getHours() + ":" + date.getMinutes();
  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={props.name}
          subheader={dateString + " " + timeString}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <p>{props.type} </p>
          <IconButton
            className={classes.ActionBtn}
            color="primary"
            aria-label="add"
            onClick={() => props.editCall(props.cardid)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => props.deleteCall(props.cardid)}
            color="secondary"
            aria-label="add to favorites"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
