import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Library.css";

const Library = (props) => {
  const { library, remove, update } = props;

  return (
    <table className="book-table">
      <thead>
        <tr className="headers">
          <th>Name</th>
          <th>Author</th>
          <th>Read</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="book-table-content">
        {library.map((book, index) => {
          return (
            <tr className="book" key={index} id={book.doc}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>
                {/* <div onClick={update}>{book.status}</div> */}
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
