
// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
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
    fetch('https://my-bookshelf-app-j6wp.onrender.com/books')
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
      fetch('https://my-bookshelf-app-j6wp.onrender.com/books', {
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

      // Create remove button
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        removeBook(book.id);
      });

      li.appendChild(removeBtn);
      bookList.appendChild(li);
    });
  }

  
   //Remove a book by ID from json-server and local list
  
  function removeBook(id) {
    fetch(`https://my-bookshelf-app-j6wp.onrender.com/books/${id}`, {
  method: 'DELETE'
    })
      .then(() => {
        books = books.filter(book => book.id !== id);
        renderBooks();
      })
      .catch(error => console.error('Error deleting book:', error));
  }
});
