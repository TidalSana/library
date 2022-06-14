import { useEffect, useState } from "react";

// components
import MainContent from "./components/MainContent";
import SignInPage from "./components/SignInPage";
import LogOut from "./components/content/LogOut";

// functions
import { deleteBook } from "./components/firestore";

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
import { createTheme, Typography } from "@mui/material";
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
  typography: {
    h1: {
      fontFamily: "Libre Franklin, sans-serif",
      fontSize: "2.5rem",
    },
    h2: {
      fontFamily: "Libre Franklin, sans-serif",
      fontSize: "2rem",
    },
    subtitle1: {
      fontFamily: "Mukta Vaani, san-serif",
      fontWeight: "600",
    },
    body1: {
      fontFamily: "Mukta Vaani, san-serif",
      fontWeight: "500",
      fontStyle: "oblique",
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
  const [read, setRead] = useState("");
  // keep track of user Auth
  const [user, setUser] = useState(null);
  // user clicks submit
  const store = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    setLibrary((prevState) => [...prevState, book]);
    try {
      const docRef = doc(bookCollection);
      await setDoc(docRef, {
        name: book.name,
        author: book.author,
        status: book.status,
        id: book.id,
        doc: docRef.id,
      });
      populateLibrary(user);
    } catch (error) {
      console.log(error);
    }
    setBook({ name: "", author: "", status: "", id: "", doc: "" });
    setRead("");
    e.target.reset();
  };
  // onchange function
  const grabChange = (e) => {
    const { name, value } = e.target;
    setRead(read);
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
      id: auth.currentUser.uid,
    }));
  };
  // onchange function for read in form section
  const grabRead = (e) => {
    setRead(e.target.value);
    setBook((prevState) => ({
      ...prevState,
      status: e.target.value,
    }));
  };
  // removes item from the library
  const removeItem = (e) => {
    const bookNumber = e.currentTarget.parentNode.parentNode.id;
    const removeBook = library.filter((item) => item.doc !== bookNumber);
    deleteBook(bookNumber, db);
    setLibrary(removeBook);
    populateLibrary(auth.currentUser);
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

  return (
    <ThemeProvider theme={theme}>
      <div className="App flex">
        <nav className="navigation flex">
          <div className="website-title">
            <Typography variant="h1" margin="1rem">
              Library App
            </Typography>
          </div>
          {user && <LogOut logOff={handleSignOut} pfp={user.photoURL} />}
        </nav>

        {user ? (
          <MainContent
            user={user}
            send={store}
            status={read}
            readStatus={grabRead}
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
