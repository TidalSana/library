import "../../styles/Intro.css";
// libraries
import { Button, TextField, MenuItem } from "@mui/material/";

const Intro = (props) => {
  const { send, status, change } = props;
  return (
    <div className="top-section">
      <div className="title-section">
        <h1 className="title">My Library</h1>
        <p className="intro">
          Hi my name is Joshua Semana and this is my take on the Library
          Project! We practiced Objects, prototypal inheritance and
          constructors. Of course we also used a lot of other techniques on top
          of this.
        </p>
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
            <TextField
              select
              name="status"
              label="Status"
              required
              size="small"
              value={status}
              className="status-dropdown form-items"
              onChange={change}
            >
              <MenuItem value="Read">Read</MenuItem>
              <MenuItem value="Not Read">Not Read</MenuItem>
            </TextField>
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
