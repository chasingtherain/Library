// main declarations
const form = document.getElementById("form")
const addBookBtn = document.getElementById("add-book")
const submitBtn = document.getElementById("submit")
const overlay = document.getElementById("overlay")
const cardContainer = document.getElementById("card-container")
let readBtn;
let cardId = 0;

let bookContent;
let readState;
let title;
let author;
let pages;
let read;

// form variables
const bookTitle = document.querySelector("input[name='title']")
const bookAuthor = document.querySelector("input[name='author']")
const bookPages = document.querySelector("input[name='pages']")
const bookRead = document.querySelector("input[name='read']")
const allInputs = document.querySelectorAll(".user-input");

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

// let myLibrary = [sample1,sample2,sample3,sample4,sample5,sample6,sample7,sample8];
let myLibrary = [];



// event listeners
addBookBtn.addEventListener("click",()=>{
    form.classList.add("form-active")
    overlay.classList.add("overlay-active")
})

// window.document.addEventListener("dblclick", ()=>{
//     form.classList.add("form-active")
// })

// add book to library after clicking submit
submitBtn.addEventListener("click",
    (event)=>{
        event.preventDefault();
        
        if(allInputs[0].value == "" || allInputs[1].value == ""|| allInputs[2].value == "" ){
            alert("Please fill in all the fields")
        }
        else{
            addBookToLibrary();
            closeModal();
            clearModal();
        }
})


// close modal when overlay is clicked
overlay.addEventListener("click",closeModal)


// function adds a book object to myLibrary array
function addBookToLibrary(){    
    title = bookTitle.value;
    author = bookAuthor.value;
    pages = bookPages.value;
    read = bookRead.checked;

    let newBook = new Book(title,author, pages, read)
    myLibrary.push(newBook)
    // console.log(myLibrary) 

    let newBookItem = document.createElement("div")
    cardContainer.appendChild(newBookItem);
    newBookItem.dataset.id = cardId
    newBookItem.classList.add("card")

    addCardContent(newBook,newBookItem);
    addRemoveBtn(newBookItem);
    updateReadState()
    cardId++;
}

// close modal
function closeModal(){
    form.classList.remove("form-active")
    overlay.classList.remove("overlay-active")
}

function clearModal(){
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    bookRead.checked = false;
}

function renderCard(){
    if (myLibrary.length == 0) return
    for (obj of myLibrary){
        let bookItem = document.createElement("div")
        cardContainer.appendChild(bookItem);
        bookItem.classList.add("card")
        for(key in obj){
            if (key == "read"){
                readState = document.createElement("button")
                readState.classList.add("read-button")
                
                if (obj[key]){
                    readState.classList.add("completed-reading")
                    readState.textContent = "Completed"
                }
                else{
                    readState.textContent = "Still Reading"
                }
                bookItem.appendChild(readState);
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
function addRemoveBtn(card){
    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Remove";
    card.appendChild(deleteBtn)
    deleteBtn.addEventListener("click", () =>{
        let confirmation = confirm("are you sure?")
        if (confirmation){
            cardContainer.removeChild(card)
        }
    })
}

// add data attribute to books
function assignCardDataId(){
    let cardsLength = 0
    cards.forEach(
        (card) => {
            card.dataset.id = cardsLength;
            cardsLength += 1;
        }
    )
    console.log(card)
}

// update readState
function updateReadState(){
    readBtn = document.querySelectorAll(".read-button")
    readBtn.forEach(
        (button) => {
            button.addEventListener("click",
            (button) => {
                console.log("read button clicked")
                console.log(button.target)
                button.target.classList.toggle("completed-reading")
                let targetObject = button.target.parentElement.getAttribute("data-id")
                console.log(targetObject)
                myLibrary[targetObject].read = !myLibrary[targetObject].read
                if (myLibrary[targetObject].read == true){
                    button.target.textContent = "Completed"
                }
                else{
                    button.target.textContent = "Still Reading"
                }
            })
        }
    )
}

function addCardContent(newBook,newBookItem){
    for (key in newBook){
        if (key == "read"){
            readState = document.createElement("button")
            readState.classList.add("read-button")
            
            if (newBook[key]){
                readState.classList.add("completed-reading")
                readState.textContent = "Completed"
            }
            else{
                readState.textContent = "Still Reading"
            }
            newBookItem.appendChild(readState);
        }
        else{
            bookContent = document.createElement("div")
            bookContent.textContent = key + ": " + newBook[key]
            newBookItem.appendChild(bookContent);
        }
    }
}