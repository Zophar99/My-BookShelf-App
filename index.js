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
 // Find the current highest ID to set next ID
      let maxId = 0;
      books.forEach(book => {
        if (Number(book.id) > maxId) {
          maxId = Number(book.id);
        }
      });
      const nextId = maxId + 1;
// Create new book object with numeric ID
      const newBook = { id: nextId, title, author };
      // Send POST request to json-server
      fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
      })
        .then(response => response.json())
        .then(addedBook => {
          books.push(addedBook);    // Add to local list
          renderBooks();            // Re-render list
          titleInput.value = '';    // Clear form fields
          authorInput.value = '';
        })
        .catch(error => console.error('Error adding book:', error));
    } else {
      alert('Please fill in both the title and author');
    }
  });
// Render the books to the DOM
   
  function renderBooks() {
    bookList.innerHTML = ''; // Clear current list

    books.forEach(book => {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;


