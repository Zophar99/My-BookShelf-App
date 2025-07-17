ocument.addEventListener('DOMContentLoaded', () => {
  // Get references to DOM elements
  const bookForm = document.getElementById('book-form');
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const bookList = document.getElementById('book-list');
  const showBooksBtn = document.getElementById('show-books-btn');
 // Local list to store books
  let books = [];
//Fetch books from json-server and display them only when user clicks "Show Books"
   
  showBooksBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => {
        books = data;
        renderBooks();
      })
      .catch(error => console.error('Error fetching books:', error));
  });
// Handle adding a new book when form is submitted
  
  bookForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (title && author) {
