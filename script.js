// main declarations
const form = document.getElementById("form")
const addBookBtn = document.getElementById("add-book")
const submitBtn = document.getElementById("submit")
const overlay = document.getElementById("overlay")
const cardContainer = document.getElementById("card-container")
let readBtn;


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
// function Book(title,author,pages,read){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

// refactor Book using class
class Book{
    constructor(title,author,pages,read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    // add remove button and add event listener to it
    addRemoveBtn(card){
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
    // update readState
    updateReadState(){
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

    //populate content onto card
    addCardContent(newBook,newBookItem){
        let key;
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

    // add data attribute to books
    assignCardDataId(){
        let cardsLength = 0
        cards.forEach(
            (card) => {
                card.dataset.id = cardsLength;
                cardsLength += 1;
            }
        )
        console.log(card)
    }

}

let myLibrary = [];

const modalTemplate = () => {
    // close modal
    const closeModal = () =>{
        form.classList.remove("form-active")
        overlay.classList.remove("overlay-active")
    }
    
    // clear modal
    const clearModal = () => {
        bookTitle.value = "";
        bookAuthor.value = "";
        bookPages.value = "";
        bookRead.checked = false;
    }

    return {clearModal, closeModal}
}

let libraryModal = modalTemplate();


// event listeners
addBookBtn.addEventListener("click",()=>{
    form.classList.add("form-active")
    overlay.classList.add("overlay-active")
})


// add book to library after clicking submit
submitBtn.addEventListener("click",
    (event)=>{
        event.preventDefault();
        
        if(allInputs[0].value == "" || allInputs[1].value == ""|| allInputs[2].value == "" ){
            alert("Please fill in all the fields")
        }
        else{
            addBookToLibrary();
            libraryModal.closeModal();
            libraryModal.clearModal();
        }
})


// close modal when overlay is clicked
overlay.addEventListener("click", libraryModal.closeModal);


// function adds a book object to myLibrary array
function addBookToLibrary(){    
    title = bookTitle.value;
    author = bookAuthor.value;
    pages = bookPages.value;
    read = bookRead.checked;
    let cardId = 0;

    let newBook = new Book(title,author, pages, read)
    myLibrary.push(newBook)

    let newBookItem = document.createElement("div")
    cardContainer.appendChild(newBookItem);
    newBookItem.dataset.id = cardId
    newBookItem.classList.add("card")

    newBook.addCardContent(newBook,newBookItem);
    newBook.addRemoveBtn(newBookItem);
    newBook.updateReadState()
    cardId++;
}

// card
const cards = document.querySelectorAll(".card");

