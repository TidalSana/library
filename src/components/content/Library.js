import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Library.css";

const Library = (props) => {
  const { library, remove, update } = props;

  return (
    <table className="book-table">
      <thead>
        <tr className="headers">
          <th>
            <Typography variant="h5">Name</Typography>
          </th>
          <th>
            <Typography variant="h5">Author</Typography>
          </th>
          <th>
            <Typography variant="h5">Status</Typography>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody className="book-table-content">
        {library.map((book, index) => {
          return (
            <tr className="book" key={index} id={book.doc}>
              <td>
                <Typography variant="body1">{book.name}</Typography>
              </td>
              <td>
                <Typography variant="body2">{book.author}</Typography>
              </td>
              <td>
                <ToggleButtonGroup
                  onClick={update}
                  exclusive
                  value={book.status}
                >
                  <ToggleButton value="Not Read">Not Read</ToggleButton>
                  <ToggleButton value="Read">Read</ToggleButton>
                </ToggleButtonGroup>
              </td>
              <td>
                <FontAwesomeIcon
                  onClick={remove}
                  className="delete"
                  icon={faDeleteLeft}
                  size="xl"
                ></FontAwesomeIcon>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Library;
