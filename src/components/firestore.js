// FireBase Cloud Storage
import { addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

// storage

// method for adding new books (docs)
const addBooks = (collect, newBook) => {
  // add new document (book) and
  // pass the collection reference ("books")
  return addDoc(collect, newBook);
};
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

export { addBooks, updateBooks, deleteBook };
