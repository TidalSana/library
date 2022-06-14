import "../../styles/Intro.css";
// libraries
import { Button, TextField, MenuItem, Typography } from "@mui/material/";
import Select from "@mui/material/Select";

const Intro = (props) => {
  const { user, send, status, readStatus, change } = props;
  return (
    <div className="top-section">
      <div className="title-section">
        <Typography variant="h2" size="small" margin="1.5rem">
          {user.displayName.split(" ")[0]}'s Library
        </Typography>
        <Typography variant="subtitle1" align="left" margin="2rem">
          This is my take on the Library Project! Originally I started this
          project in September of 2021 where I practiced Objects, prototypal
          inheritance and constructors. However, in the The Odin Project
          curriculum we come back to implement backend concepts to this app. I
          went ahead and applied FireBase on the backend which includes Firebase
          Authentication and Cloud Firestore. Your typical CRUD Application!
          ~Joshua Semana
        </Typography>
      </div>
      <div className="form-container">
        <form onSubmit={send}>
          <div className="title-container form-items">
            <TextField
              onChange={change}
              type="text"
              id="book-title"
              name="name"
              label="Book Title"
              required
              defaultValue=""
              variant="filled"
              size="small"
            />
          </div>
          <div className="author-name form-items">
            <TextField
              onChange={change}
              type="text"
              id="author-title"
              name="author"
              label="Author Name"
              required
              defaultValue=""
              variant="filled"
              size="small"
            />
          </div>
          <div className="status">
            <Select
              name="status"
              label="Status"
              required
              size="small"
              value={status}
              className="status-dropdown form-items"
              onChange={readStatus}
            >
              <MenuItem value={"Read"}>Read</MenuItem>
              <MenuItem value={"Not Read"}>Not Read</MenuItem>
            </Select>
          </div>
          <div className="add-book-button form-items">
            <Button
              type="submit"
              className="submit-info"
              variant="contained"
              size="small"
              color="secondary"
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Intro;
