// main declarations
const form = document.getElementById("form")
const addBookBtn = document.getElementById("add-book")
const submitBtn = document.getElementById("submit")
const overlay = document.getElementById("overlay")
const cardContainer = document.getElementById("card-container")

let bookContent;
let readState;
let title;
let author;
let pages;

// form variables
const bookTitle = document.querySelector("input[name='title']")
const bookAuthor = document.querySelector("input[name='author']")
const bookPages = document.querySelector("input[name='pages']")

//object init
function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Book.prototype.bookInfo = function(){
//     if (this.read){
//         console.log(`${this.title} by ${this.author}, ${this.pages} pages, completed reading the book`)
//     }
//     else{
//         console.log(`${this.title} by ${this.author}, ${this.pages} pages, not read yet`)
//     }
// }

let sample1 = new Book("a scary story","mr midnight", 999,false)
let sample2 = new Book("a funny story","mr comedian", 129,false)
let sample3 = new Book("a happy story","mr sunny", 99,true)
let sample4 = new Book("a sad story","mr rainy", 19,true)
let sample5 = new Book("a scary story","mr midnight", 999,false)
let sample6 = new Book("a funny story","mr comedian", 129,false)
let sample7 = new Book("a happy story","mr sunny", 99,true)
let sample8 = new Book("a sad story","mr rainy", 19,true)

let myLibrary = [sample1,sample2,sample3,sample4,sample5,sample6,sample7,sample8];

// event listeners
addBookBtn.addEventListener("click",()=>{
    form.classList.add("form-active")
    overlay.classList.add("overlay-active")
})

// window.document.addEventListener("dblclick", ()=>{
//     form.classList.add("form-active")
// })

submitBtn.addEventListener("click",addBookToLibrary)

// close modal when overlay is clicked
overlay.addEventListener("click",closeModal)


// function adds a book object to myLibrary array
function addBookToLibrary(){
    userInput();
    renderCard();
}

// function reads input provided by user
function userInput(){    
    title = bookTitle.value;
    author = bookAuthor.value;
    pages = bookPages.value;
    // let newBook = new Book("a brand new book","Vivian Tay", 999,false)
    let newBook = new Book(title,author, pages,false)
    myLibrary.push(newBook)
    console.log(myLibrary) 
    // cardContainer.appendChild(newBook)
    // console.log(bookTitle.value)
    // console.log(bookAuthor.value);
    // console.log(bookPages.value);
}

// close modal
function closeModal(){
    console.log("close modal fx activated")
    form.classList.remove("form-active")
    overlay.classList.remove("overlay-active")
}

renderCard()
function renderCard(){
    if (myLibrary.length == 0) return
    for (obj of myLibrary){
        let bookItem = document.createElement("div")
        cardContainer.appendChild(bookItem);
        bookItem.classList.add("card")
        for(key in obj){
            if (key == "read"){
                readState = document.createElement("button")
                readState.textContent = obj[key]
                bookItem.appendChild(readState);
                readState.addEventListener("click",(event) => {
                    console.log(obj)
                })
            }
            else{
                bookContent = document.createElement("div")
                bookContent.textContent = obj[key]
                bookItem.appendChild(bookContent);
            }
        }
    }
}

// remove card
const cards = document.querySelectorAll(".card");

// add remove button and add event listener to it
cards.forEach((card) => {
    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Remove";
    card.appendChild(deleteBtn)
    deleteBtn.addEventListener("click", () =>{
        let confirmation = confirm("are you sure?")
        if (confirmation){
            cardContainer.removeChild(card)
        }
    })
   }) 

function changeReadState(){

}

