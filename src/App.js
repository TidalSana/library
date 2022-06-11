import { useEffect, useState } from "react";

// components
import MainContent from "./components/MainContent";
import SignInPage from "./components/SignInPage";
import LogOut from "./components/content/LogOut";

// functions
import { addBooks, deleteBook } from "./components/firestore";

// styles
import "./styles/App.css";
import "./styles/Nav.css";

// FireBase Auth
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// FireBase Cloud Storage
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import db from "./firebase";

// Auth
const provider = new GoogleAuthProvider();
const auth = getAuth();

// FireStore Cloud
// colection reference to firebase online
const bookCollection = collection(db, "books");

const App = () => {
  // library array
  const [library, setLibrary] = useState([]);
  // book object
  const [book, setBook] = useState({
    name: "",
    author: "",
    status: "",
  });
  // keep track of user Auth
  const [user, setUser] = useState({});
  useEffect(() => {
    const q = query(bookCollection, orderBy("name", "asc"));

    getDocs(bookCollection)
      .then((snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        console.log(books);
        setLibrary([...books]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const store = async (e) => {
    e.preventDefault();
    setLibrary((prevState) => [...prevState, book]);
    try {
      await addBooks(bookCollection, book);
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };
  const grabChange = (e) => {
    const { name, value } = e.target;
    const status = document.querySelector(".status-dropdown").name;
    const statusValue = document.querySelector(".status-dropdown").value;

    setBook((prevState) => ({
      ...prevState,
      [name]: value,
      [status]: statusValue,
    }));
  };
  const removeItem = (e) => {
    const bookNumber = e.target.parentNode.parentNode.id;
    const removeBook = library.filter((item) => item.id !== bookNumber);
    console.log(removeBook);

    deleteBook(bookNumber, db);
    setLibrary(removeBook);
  };
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        setUser(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="App flex">
      <nav className="navigation flex">
        <div className="website-title">
          <h1>My Library App</h1>
        </div>
        {user && <LogOut logOff={handleSignOut} pfp={user.photoURL} />}
      </nav>

      {user ? (
        <MainContent
          send={store}
          change={grabChange}
          remove={removeItem}
          logOff={handleSignOut}
          library={library}
        />
      ) : (
        <SignInPage click={handleSignIn} />
      )}
    </div>
  );
};

export default App;
