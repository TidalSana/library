const form = document.getElementById('form');
const title = document.getElementById('book-title');
const writer = document.getElementById('author-name');
const statusValue = document.forms["form"].elements["status"];
const submit = document.getElementById('submit-button');
const table = document.querySelector('table');
const removeRow = document.querySelector('deleteButton');

// placeholder values for live presses of alphas
let bookName = title.value;
let writerName = writer.value;
let readStatus;

// default place holder array 
let placeHolderArray = [
  {
    name: "Game of Thrones",
    author: "George R. R. Martin", 
    read: "Unread"
  },
  {
    name: "Jujutsu Kaisen",
    author: "Gege Akutami",
    read: "Read"
  }
];

// array we pull the data from
let myLibrary = [];
// titles for header sections
let headers = ['Name', 'Author', 'Status', ' '];
let data = Object.keys(placeHolderArray[0]);



// constructor for book
class Book {
  constructor(name, author, read) {
    this.name = name; 
    this.author = author; 
    this.read = read;
  }
}

// function that creates the header section
let makeTableHead = function(table, headers) {
  // create header section for the existing table
  let theader = table.createTHead();
  // we add a row to the header section (theader)
  let row = theader.insertRow(); 
  // for each property inside of our library
  for (let key of headers) {
    // we create an <th> element
    let th = document.createElement("th");
    // we then text out of our key property names in our 
    // placeholder array (data)
    let text = document.createTextNode(key);
    th.setAttribute("class", "tableHead");
    // then we add the text to the <th> element
    th.appendChild(text);
    // finally we add the <th> element filled with text
    // to the row
    row.appendChild(th);
  }
};
// calls the function to make the header
makeTableHead(table, headers);

// this function makes the buttons
let makeButton = function(row) {
  // it makes a new cell in this row, 
  // then it sets the class for the cell, 
  // creates a button and also adds a class, 
  // then appends the cell (button) to the row
  let cell = row.insertCell();
  cell.setAttribute("class", "tableCell");
  let button = document.createElement('button');
  button.setAttribute("class", "deleteButton");
  cell.appendChild(button);
  button.innerHTML = "Delete";
  button.addEventListener('click', function(e) {
      var td = e.target.parentElement; 
      var tr = td.parentElement;
      tr.parentElement.removeChild(tr);
      myLibrary.splice(0, 1 );
  });
  
};

// function to display place holder array
let displayPlaceHolder = function(table, data) {
  for(let element of data){
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      cell.setAttribute("class", "tableCell");
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
    makeButton(row);
  }
};
// show the placeholderArray
displayPlaceHolder(table, placeHolderArray);

// function to make array into rows and data cells
let showUserBooks = function(table, data) {
  for(element of data){
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      cell.setAttribute("class", "tableCell");
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
    makeButton(row);
  } 
};

// checks if there is a change in title box
title.addEventListener('input', function(e) {
  bookName = this.value;
});

// checks if there is a change in writer/author box
writer.addEventListener('input', function(e) {
  writerName = this.value;
});

// checks for radio button if its empty
let radioStatus = function() {
  // here we check if the value is undefined, if so we return false
  if (readStatus === undefined) {
    alert("Please choose read or unread")
    return false;
  }
};

// function that pushes textBox values into userObject
let pushValues = function() {
  // if it's false, we will leave pushingValues function
  if(radioStatus() === false) {
    return;
  } else { // if not, then we change the values for radio buttons. 
    radioStatus();
  }
  // then we set user Object properties
  const userBook = new Book(
      bookName, 
      writerName, 
      readStatus
  );

  // here we pass the properties into check 
  // so we can check for blank text boxes
  if (check(bookName, writerName) === false) {
  } else { // if the check is passed, it will add book to array
    addBookToLibrary(userBook); 
  }
  // this variable will only return last item added
  // slice goes back (-1) in the array
  let lastElement = myLibrary.slice(-1);
  // we call the function that updates the table
  // and displays last element added
  showUserBooks(table, lastElement);
};

// function that checks if blanks are left, otherwise adds it to library
let check = function(bookName, writerName) {
  if(bookName === "" && writerName === "") {
    alert("Please enter Book and Author");
    return false;
  } else if (typeof bookName === "string" && writerName === "") {
    alert("Please enter Author");
    return false;
  } else if (bookName === "" && typeof writerName === "string") {
    alert("Please enter Book");
    return false;
  } else {
    return true;
  }
}
// function that pushes userBook to array for list
let addBookToLibrary = function(userBook) {
  myLibrary.push(userBook);
  console.log(myLibrary);
};

// function that runs when a key is pressed
// if it's the enter key it will run pushValues() 
let checkSubmit = function(e) {
  if (e && e.keyCode == 13) {
    pushValues();
  }
};
// listens for key press 'enter' 
form.addEventListener('keypress', checkSubmit);
// listens for submit button press
submit.addEventListener('click', pushValues);
// listens for clicks on radio value
for(let i = 0; i < statusValue.length; i++) {
  statusValue[i].onclick = function() {
    readStatus = this.value;
  }
}
