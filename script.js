function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const date = document.getElementById("date").value;
  const isComplete = document.getElementById("status").checked;

  const book = {
    id: +new Date(),
    title: title,
    author: author,
    year: Number(date),
    isComplete: isComplete,
  };

  if (title === "" || author === "" || date === "") {
    alert("Mohon isi semua kolom sesuai instruksi");
    return;
  }

  const books = JSON.parse(localStorage.getItem("books")) || [];

  books.push(book);

  localStorage.setItem("books", JSON.stringify(books));

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("date").value = "";

  console.log(book);
}

function deleteBook(index) {
  const books = JSON.parse(localStorage.getItem("books")) || [];

  books.splice(index, 1);

  localStorage.setItem("books", JSON.stringify(books));

  displayBooks();
}

function displayBooks() {
  const unreadBookList = document.getElementById("unreadBook");
  unreadBookList.innerHTML = "";
  const readBookList = document.getElementById("readBook");
  readBookList.innerHTML = "";

  const books = JSON.parse(localStorage.getItem("books")) || [];

  for (var i = 0; i < books.length; i++) {
    const judul = document.createElement("h2");
    judul.classList.add("judul");
    judul.textContent = books[i].title;

    const creator = document.createElement("p");
    creator.classList.add("creator");
    creator.textContent = "Penulis : " + books[i].author;

    const tahun = document.createElement("p");
    tahun.classList.add("tahun");
    tahun.textContent = "Tahun rilis : " + books[i].date;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.classList.add("del-btn");
    deleteButton.onclick = (function (index) {
      return function () {
        deleteBook(index);
      };
    })(i);

    const toggleStatusButton = document.createElement("button");
    toggleStatusButton.classList.add("cek-btn");
    toggleStatusButton.textContent =
      books[i].isComplete === !1 ? "Belum Dibaca" : "Sudah Dibaca";
    toggleStatusButton.onclick = (function (index) {
      return function () {
        toggleStatus(index);
      };
    })(i);

    if (books[i].isComplete === !0) {
      readBookList.appendChild(judul);
      readBookList.appendChild(creator);
      readBookList.appendChild(tahun);
      readBookList.appendChild(deleteButton);
      readBookList.appendChild(toggleStatusButton);
    } else {
      unreadBookList.appendChild(judul);
      unreadBookList.appendChild(creator);
      unreadBookList.appendChild(tahun);
      unreadBookList.appendChild(deleteButton);
      unreadBookList.appendChild(toggleStatusButton);
    }
  }
}

function toggleStatus(index) {
  const books = JSON.parse(localStorage.getItem("books")) || [];

  books[index].isComplete = books[index].isComplete === !1 ? !0 : !1;

  localStorage.setItem("books", JSON.stringify(books));

  displayBooks();
}

displayBooks();
