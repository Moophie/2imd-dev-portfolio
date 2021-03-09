class Note {
  constructor(title) {
    this.title = title;
    // HINT🤩 this.element = this.createElement(title);

    this.element = this.createElement(title);
  }

  createElement(title) {
    let newNote = document.createElement("li");
    newNote.innerHTML = title;

    // HINT🤩 newNote.addEventListener('click', this.remove.bind(newNote));

    newNote.addEventListener('click', this.remove.bind(newNote))
    return newNote;
  }

  add() {
    // HINT🤩
    // this function should append the note to the screen somehow
    let taskList = document.getElementById("taskList");
    taskList.appendChild(this.element);
  }

  saveToStorage() {
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
    let allNotes = window.localStorage.getItem("allNotes");
    if (allNotes) {
      allNotes = JSON.parse(allNotes);
    } else {
      allNotes = [];
    }
    allNotes.push(this.title);
    window.localStorage.setItem("allNotes", JSON.stringify(allNotes));
  }

  remove() {
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    // .removeChild(this)
    // remove the item from screen and from localstorage
    let taskList = document.getElementById("taskList");
    taskList.removeChild(this);
  }
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
    this.txtTodo = document.getElementById("taskInput");
    this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
    this.loadNotesFromStorage();

    // HINT🤩
    // pressing the enter key in the text field triggers the createNote function
    // this.txtTodo = ???
    // this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
    // read up on .bind() -> we need to pass the current meaning of this to the eventListener
    // when the app loads, we can show previously saved noted from localstorage
    // this.loadNotesFromStorage();
  }

  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    let allNotes = window.localStorage.getItem("allNotes");
    if (allNotes) {
      allNotes = JSON.parse(allNotes);
    } else {
      allNotes = [];
    }
    allNotes.forEach((n) => {
      let title = n;
      let note = new Note(title);
      note.add();
    });
  }

  createNote(e) {
    // this function should create a new note by using the Note() class
    // HINT🤩
    // note.add();
    // note.saveToStorage();
    // clear the text field with .reset in this class
    // if (e.key === "Enter")

    if (e.key === "Enter") {
      e.preventDefault();
      let note = new Note(this.txtTodo.value);
      note.add();
      note.saveToStorage();

      this.reset();
    }
  }

  reset() {
    // this function should reset the form / clear the text field
    this.txtTodo.value = "";
  }
}

let app = new App();
