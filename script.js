const library = [];

function displayBooks(books) {
  const booksUI = document.getElementById('books');
  booksUI.innerHTML = '';

  books.forEach(
    ({ title, author, pages, read }) => {
      booksUI.innerHTML += `
        <article class="book">
          <h2 class="book-title">${title}</h2>
          <p class="book-author">by ${author}</p>
          <p class="book-pages">${pages} pages</p>
          <button type="button" class="book-read-btn">${read ? "Read" : "Not read"}</button>
        </article>
      `
    }
  )
}

// TODO: Add functionality to book-read-btn buttons
displayBooks(library);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const newBookBtn = document.getElementById('new-book-btn');
const newBookModal = document.getElementById('new-book-modal');
const titleInput = document.getElementById('new-book-title');
const authorInput = document.getElementById('new-book-author');
const pagesInput = document.getElementById('new-book-pages');
const readInput = document.getElementById('new-book-read');
const notReadInput = document.getElementById('new-book-not-read');
const addBookBtn = document.getElementById('add-book-btn');
const cancelAddBookBtn = document.getElementById('cancel-add-book-btn');
let newBookTitle;
let newBookAuthor;
let newBookPages;
let newBookRead;

newBookBtn.addEventListener('click', () => {
  newBookModal.showModal();
})

addBookBtn.addEventListener('click', addBook)

cancelAddBookBtn.addEventListener('click', () => {
  resetInputValues();
  newBookModal.close();
})

titleInput.addEventListener('change', (e) => {
  newBookTitle = e.target.value;
})

authorInput.addEventListener('change', (e) => {
  newBookAuthor = e.target.value;
})

pagesInput.addEventListener('change', (e) => {
  newBookPages = e.target.value;
})

readInput.addEventListener('change', (e) => {
  if (e.target.checked === true) {
    newBookRead = true;
  }
})

notReadInput.addEventListener('change', (e) => {
  if (e.target.checked === true) {
    newBookRead = false;
  }
})

function resetInputValues() {
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = null;
  readInput.checked = false;
  notReadInput.checked = false;
}

function addBook() {
  const newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
  library.push(newBook);
  displayBooks(library);
  resetInputValues();
  newBookModal.close();
}