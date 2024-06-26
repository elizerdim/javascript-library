const newBookBtn = document.getElementById('new-book-btn');
const booksDisplay = document.getElementById('books');
const newBookModal = document.getElementById('new-book-modal');
const newBookForm = document.getElementById('new-book-form');
const titleInput = document.getElementById('new-book-title');
const authorInput = document.getElementById('new-book-author');
const pagesInput = document.getElementById('new-book-pages');
const readInput = document.getElementById('new-book-read');
const notReadInput = document.getElementById('new-book-not-read');
const addBookBtn = document.getElementById('add-book-btn');
const cancelAddBookBtn = document.getElementById('cancel-add-book-btn');
const discardChangesModal = document.getElementById('discard-changes-modal');
const discardChangesBtn = document.getElementById('discard-changes-btn');
const cancelDiscardChangesBtn = document.getElementById('cancel-discard-changes-btn');
const removeBookModal = document.getElementById('remove-book-modal');
const removeBtn = document.getElementById('remove-btn');
const cancelRemoveBtn = document.getElementById('cancel-remove-btn');

const library = JSON.parse(localStorage.getItem('books')) || [];

if (library.length) {
  displayBooks(library);
}

let newBookTitle;
let newBookAuthor;
let newBookPages;
let newBookRead;
let bookIdToRemove;

function displayBooks(books) {
  booksDisplay.innerHTML = '';

  books.forEach(
    ({ id, title, author, pages, read }) => {
      booksDisplay.innerHTML += `
        <article class="book" id="${id}">
          <h2 class="book-title">${title}</h2>
          <p class="book-author">by ${author}</p>
          <p class="book-pages">${pages} pages</p>
          <button type="button" class="book-read-btn" onclick="toggleReadStatus(this)">${read ? "Read" : "Not read"}</button>
          <button type="button" class="book-remove-btn" onclick="openRemoveBookModal(this)">Remove</button>
        </article>
      `
    }
  )
}

function Book(title, author, pages, read) {
  this.id = Date.now() + Math.random();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook() {
  newBookTitle = titleInput.value;
  newBookAuthor = authorInput.value;
  newBookPages = pagesInput.value;
  newBookRead = readInput.value;
  const newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
  library.unshift(newBook);
  localStorage.setItem('books', JSON.stringify(library));
  displayBooks(library);
  resetInputValues();
  newBookModal.close();
}

function toggleReadStatus(toggleReadBtn) {
  const bookIndex = library.findIndex(book => book.id === Number(toggleReadBtn.parentElement.id));
  library[bookIndex].read = !library[bookIndex].read;
  localStorage.setItem('books', JSON.stringify(library));
  toggleReadBtn.innerText = library[bookIndex].read ? "Read" : "Not read";
} 

function openRemoveBookModal(removeBtn) {
  removeBookModal.show();

  bookIdToRemove = Number(removeBtn.parentElement.id);
}

function resetInputValues() {
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = null;
  readInput.checked = false;
  notReadInput.checked = false;
}

newBookBtn.addEventListener('click', () => {
  newBookModal.showModal();
})

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
})

cancelAddBookBtn.addEventListener('click', () => {
  const inputsContainValues = 
    titleInput.value ||
    authorInput.value ||
    pagesInput.value ||
    readInput.checked ||
    notReadInput.checked;

  if (inputsContainValues) {
    discardChangesModal.showModal();
  } else {
    newBookModal.close();
  }
})

discardChangesBtn.addEventListener('click', () => {
  resetInputValues();
  discardChangesModal.close();
  newBookModal.close();
})

cancelDiscardChangesBtn.addEventListener('click', () => {
  discardChangesModal.close();
})

removeBtn.addEventListener('click', () => {
  const bookIndex = library.findIndex(book => book.id === bookIdToRemove);
  library.splice(bookIndex, 1);
  localStorage.setItem('books', JSON.stringify(library));
  
  const bookElementToBeRemoved = document.getElementById(`${bookIdToRemove}`);
  bookElementToBeRemoved.remove();
  removeBookModal.close();
})

cancelRemoveBtn.addEventListener('click', () => {
  removeBookModal.close();
}) 