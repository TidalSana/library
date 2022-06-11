import { useState } from "react";
import "../../styles/Library.css";

const Library = (props) => {
  const { library, remove } = props;
  const [name, setName] = useState(false);

  const changeOrder = (e) => {
    setName(!name);
    console.log(name);
  };
  return (
    <table className="book-table">
      <thead>
        <tr className="headers">
          <th>
            Name <button onClick={changeOrder}>something</button>
          </th>
          <th>Author</th>
          <th>Read</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="book-table-content">
        {library.map((book, index) => {
          return (
            <tr className="book" key={index} id={book.id}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.status}</td>
              <td>
                <button onClick={remove} className="delete">
                  X
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Library;
