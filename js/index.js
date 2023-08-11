document.addEventListener("DOMContentLoaded", function() {

const booksUrl = 'http://localhost:3000/books';
const usersUrl = 'http://localhost:3000/users';
const ul = document.getElementById('list');
const panel = document.getElementById('show-panel');
let bookImg = document.createElement('img');
let bookDescription = document.createElement('p');
let likeUl = document.createElement('ul');
// let likeLi = document.createElement('li');
let likeButton = document.createElement('button');
panel.appendChild(bookImg);
panel.appendChild(bookDescription);
panel.appendChild(likeUl);
let currBook;
// likeUl.appendChild(likeLi);


function displayBooks(book) {
    let li = document.createElement('li');
    li.style.cursor = 'pointer';
    li.textContent = book.title;
    ul.append(li);

    li.addEventListener('click', () => {
        likeUl.innerHTML = '';
        currBook = book;
        bookImg.src = book.img_url;
        bookDescription.textContent = book.description;
        likeButton.textContent = 'Like <3';
        panel.appendChild(likeButton);
        book.users.forEach(user => {
            let likeLi = document.createElement('li');
            likeLi.textContent = user.username;
            likeUl.appendChild(likeLi);
        })
    })
}

likeButton.addEventListener('click', () => {
    let obj = {
        users: [
            ...currBook.users,
            {id: 1, username: 'pouros'}
        ]
    };
   
  
    

    fetch(`${booksUrl}/${currBook.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj)
    })

})

fetch(booksUrl)
.then(resp => resp.json())
.then(data => {
    data.forEach(book => {
        displayBooks(book);
    });    
    console.log(data)
})










});
