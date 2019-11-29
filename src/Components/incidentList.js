import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IncidentCard from "./incidentCard";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [popup, setPopup] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [updateBtn, setUpdateBtn] = useState(false);
  const date = new Date();
  const dateString =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  const timeString = date.getHours() + ":" + date.getMinutes();
  const addIncident = () => {
    const data = [
      ...incidents,
      {
        id: incidents.length + 1,
        type: type,
        name: name,
        datetime: date,
        description: description,
        lastupdate: ""
      }
    ];
    setPopup(false);
    setIncidents(data);
    setType("");
    setName("");
    setDescription("");
  };
  const removeIncidetnt = id => {
    setIncidents(incidents.filter(el => el.id !== id));
  };

  const updateIncident = id => {
    setUpdateBtn(true);
    let temp = {};
    for (let i = 0; i < incidents.length; i++) {
      if (Number(incidents[i].id) === Number(id)) {
        temp = incidents[i];
      }
    }
    setUpdateId(temp.id);
    setType(temp.type);
    setName(temp.name);
    setDescription(temp.description);
    setPopup(true);
  };
  const updateIncidentInfo = () => {
    const temp = incidents.filter(el => el.id !== updateId);
    const data = [
      ...temp,
      {
        id: updateId,
        type: type,
        name: name,
        datetime: date,
        description: description,
        lastupdate: new Date()
      }
    ];
    data.sort((a, b) => {
      return a.id - b.id;
    });
    setPopup(false);
    setIncidents(data);
    setUpdateBtn(false);
    setUpdateId("");
    setType("");
    setName("");
    setDescription("");
  };
  return (
    <div>
      <div style={{ width: "165px", margin: "0 auto" }}>
        <Fab
          onClick={() => setPopup(true)}
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
          New Incident
        </Fab>
      </div>

      <br />
      {incidents.map((data, indx) => (
        <IncidentCard
          key={indx}
          cardid={data.id}
          type={data.type}
          name={data.name}
          date={data.date}
          description={data.description}
          deleteCall={removeIncidetnt}
          editCall={updateIncident}
        />
      ))}

      <Dialog open={popup} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Incident</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dateString}&nbsp;{timeString}
          </DialogContentText>
          <TextField
            id="filled-select-currency"
            select
            label="Select"
            helperText="Select incident type"
            margin="normal"
            variant="filled"
            onChange={e => setType(e.target.value)}
            value={type}
          >
            {["type one", "type two", "type three", "type four"].map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
            fullWidth
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            margin="normal"
            variant="outlined"
            onChange={e => setDescription(e.target.value)}
            value={description}
            fullWidth
          />
          <div style={{ width: "165px", margin: "0 auto" }}>
            {updateBtn ? (
              <Fab
                onClick={() => updateIncidentInfo()}
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
              >
                <AddIcon />
                Update Info
              </Fab>
            ) : (
              <Fab
                onClick={addIncident}
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
              >
                <AddIcon />
                Add Incident
              </Fab>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setPopup(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IncidentList;
