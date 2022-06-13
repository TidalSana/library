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
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// FireBase Cloud Storage
import {
  getDocs,
  collection,
  query,
  orderBy,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import db from "./firebase";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

// Auth
const provider = new GoogleAuthProvider();
const auth = getAuth();

// FireStore Cloud
// colection reference to firebase online
const bookCollection = collection(db, "books");

// MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#1a237e",
    },
  },
});

const App = () => {
  // library array
  const [library, setLibrary] = useState([]);
  // book object to hold properties
  const [book, setBook] = useState({
    name: "",
    author: "",
    status: "",
    id: "",
    doc: "",
  });
  // status for book being added
  const [read, setRead] = useState("Not Read");
  // keep track of user Auth
  const [user, setUser] = useState(null);
  // user clicks submit
  const store = async (e) => {
    e.preventDefault();
    console.log("running");
    const user = auth.currentUser;
    populateLibrary(user);
    setLibrary((prevState) => [...prevState, book]);
    try {
      await addBooks(bookCollection, book);
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  };
  // onchange function
  const grabChange = (e) => {
    const { name, value } = e.target;
    const status = document.querySelector(".status-dropdown").name;
    setRead(value);
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
      [status]: value,
    }));
  };
  // removes item from the library
  const removeItem = (e) => {
    const bookNumber = e.target.parentNode.parentNode.id;
    const removeBook = library.filter((item) => item.doc !== bookNumber);
    deleteBook(bookNumber, db);
    setLibrary(removeBook);
  };
  // function to populate screen
  const populateLibrary = async (account) => {
    const q = query(bookCollection, orderBy("name", "asc"));
    await getDocs(q)
      .then((snapshot) => {
        let books = [];
        let uid = account.uid;

        snapshot.docs.forEach((doc) => {
          if (uid !== doc.data().id) return;

          books.push({ ...doc.data(), doc: doc.id });
          setBook((prevState) => ({
            ...prevState,
            doc: doc.id,
          }));
        });
        setLibrary([...books]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // for updating read status
  const updateRead = (e) => {
    e.preventDefault();
    const bookNumber = e.target.parentNode.parentNode.parentNode.id;
    const docRef = doc(db, "books", bookNumber);

    setLibrary(
      library.map((item) => {
        if (item.doc !== bookNumber) return item;
        updateDoc(docRef, {
          status: e.target.value,
        });
        return { ...item, status: e.target.value };
      })
    );
  };
  // function that runs when user signs in
  const handleSignIn = () => {
    // prompts google auth popup
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setBook((prevState) => ({
          ...prevState,
          id: user.uid,
        }));
        populateLibrary(user);
        return setDoc(doc(db, "users", user.uid), {
          name: user.uid,
          display: user.displayName,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // function that runs when user signs out
  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        setUser(result);
        setLibrary([]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    populateLibrary(auth.currentUser);
  }, [user]);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(user);
    }
  });
  return (
    <ThemeProvider theme={theme}>
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
            status={read}
            change={grabChange}
            remove={removeItem}
            update={updateRead}
            logOff={handleSignOut}
            library={library}
          />
        ) : (
          <SignInPage click={handleSignIn} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
