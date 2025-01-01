const libraryButton = document.getElementById("my-library-btn");
const libraryCategories = document.getElementById("library-categories");
let recentlyOpenedBooks = [];
let allBooks = []; 

libraryButton.addEventListener('click',()=> {
  if (libraryCategories.style.display === 'none'){
    libraryCategories.style.display= 'block';
  }else{
    libraryCategories.style.display = 'none';
  }
});



const API_URL = "http://localhost:5000/books";


async function fetchBooks() {
  try {
    const response = await fetch(API_URL);
    const books = await response.json();
    allBooks = books;
    updateRecentlyOpened(recentlyOpenedBooks);
    updateLibraryCategories(books);
    addSearchFunctionality(books); 
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
}


function updateRecentlyOpened(books) {
  const recentlyOpenedSection = document.getElementById("recently-opened");
  recentlyOpenedSection.innerHTML = ""; 

  if (books.length === 0) {
    recentlyOpenedSection.innerHTML = '<p class="text-muted text-center">No recent books</p>';
  } else {
    
    books.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.className = "book-item d-flex align-items-center mb-2";
      bookItem.innerHTML = `
        <img src="pdf-icon.png" alt="PDF Icon" class="me-3" style="width: 40px; height: 40px;">
        <div>
          <strong><a href="${book.fileUrl}" target="_blank" class="text-dark">${book.title}</a></strong><br>
          <span class="text-muted">${book.category}</span>
        </div>
      `;
      recentlyOpenedSection.appendChild(bookItem);
    });
  }
}


function updateLibraryCategories(books) {
  const libraryCategories = {};
  books.forEach((book) => {
    if (!libraryCategories[book.category]) {
      libraryCategories[book.category] = [];
    }
    libraryCategories[book.category].push(book);
  });

  const libraryCategoriesList = document.getElementById("library-categories").querySelector("ul");
  libraryCategoriesList.innerHTML = ""; 

  Object.entries(libraryCategories).forEach(([category, books]) => {
    const categoryItem = document.createElement("li");
    categoryItem.className = "list-group-item";
    categoryItem.textContent = category;

    const bookList = document.createElement("ul");
    bookList.className = "book-list";
    books.forEach((book) => {
      const bookItem = document.createElement("li");
      bookItem.innerHTML = `
        <img src="pdf-icon.png" alt="PDF Icon" class="me-2" style="width: 20px; height: 20px;">
        <a href="${book.fileUrl}" target="_blank" class="text-dark">${book.title}</a>
      `;

  
  bookItem.addEventListener("click", () => {
    
     recentlyOpenedBooks = recentlyOpenedBooks.filter((b) => b.title !== book.title);

     
     recentlyOpenedBooks.unshift(book);

     
     if (recentlyOpenedBooks.length > 5) {
       recentlyOpenedBooks.pop();
     }
     updateRecentlyOpened(recentlyOpenedBooks);

   });

  bookList.appendChild(bookItem);
    });

    categoryItem.addEventListener("click", () => {
      bookList.style.display =
        bookList.style.display === "none" || bookList.style.display === "" ? "block" : "none";
    });

    libraryCategoriesList.appendChild(categoryItem);
    libraryCategoriesList.appendChild(bookList);
  });
}

function addSearchFunctionality(books) {
  const searchInput = document.getElementById("library-search");

  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );
    updateLibraryCategories(filteredBooks);
  });
}


function setupPagination() {
  let currentPage = 1;
  const itemsPerPage = 10;

  function paginateBooks() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const paginatedBooks = allBooks.slice(start, end);
    updateLibraryCategories(paginatedBooks);

    currentPage += 1;
    if (start >= allBooks.length) {
      window.removeEventListener("scroll", handleScroll);
    }
  }

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
      paginateBooks();
    }
  }

  window.addEventListener("scroll", handleScroll);
  paginateBooks();
}



async function handleFormSubmit() {
  const title = document.getElementById("title-input").value.trim();
  const category = document.getElementById("category-select").value;
  const fileInput = document.getElementById("pdf-upload").files[0];

  if (!title || !category || !fileInput) {
    alert("Please fill in all fields and upload a PDF.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("file", fileInput);

  try {
    const response = await fetch("http://localhost:5000/books", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Book added successfully!");
      fetchBooks(); 
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add the book.");
    }
  } catch (error) {
    alert(error.message);
  }

  
  document.getElementById("title-input").value = "";
  document.getElementById("category-select").value = "";
  document.getElementById("pdf-upload").value = "";
}


document.getElementById("submit-btn").addEventListener("click", handleFormSubmit);


fetchBooks();
setupPagination();

