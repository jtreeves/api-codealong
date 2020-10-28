document.getElementById('submit-button').addEventListener('click', function() {
    const genre = document.getElementById('genre-input').value;
    fetchBook(genre);
});

function fetchBook(genre) {
    fetch(`http://openlibrary.org/subjects/${genre}.json`)
    .then(result => result.json())
    .then(json => {
        const randomBook = getRandomBook(json.works);
        const title = randomBook.title;
        const author = getAuthor(randomBook);
        const cover = `http://covers.openlibrary.org/b/id/${randomBook.cover_id}-M.jpg`;
        appendBookToDom(title, author, cover);
    })
};

function appendBookToDom(title, author, cover) {
    const titleH3 = document.createElement('h3');
    titleH3.textContent = title;
    const authorH5 = document.createElement('h5');
    authorH5.textContent = author;
    const coverImage = document.createElement('img');
    coverImage.setAttribute('src', `${cover}`);
    document.querySelector('#display-book').append(titleH3, authorH5, coverImage);
};

function getRandomBook(books) {
    const randomIndex = Math.floor(Math.random()*books.length);
    return books[randomIndex];
};

// Temporary; needs to be improved around to handle multiple authors
function getAuthor(book) {
    return book.authors[0].name;
};