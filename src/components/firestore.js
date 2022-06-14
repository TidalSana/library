// FireBase Cloud Storage
import { updateDoc, deleteDoc, doc } from "firebase/firestore";

// storage

// updates book in the collection
// takes id and book we want to update
const updateBooks = (id, updatedBook, database) => {
  // variable for checking if the book exists
  const bookDoc = doc(database, "books", id);
  return updateDoc(bookDoc, updatedBook);
};
// deletes the book in the collection
const deleteBook = (id, database) => {
  // variable for checking if the book exists
  const bookDoc = doc(database, "books", id);
  return deleteDoc(bookDoc);
};

export { updateBooks, deleteBook };
