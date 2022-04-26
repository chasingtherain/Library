# Library
an app that keeps a record of books read by the user


pseudocode
HTML structure
- header
    - logo
    - account and log out page
- body
    - (+) Add book button
    - display cards

- footer
    - footer


Add book button
- triggers modal form that ask for:
    - textbox: title, author, pages (min: 1)
    - checkbox: read 
- once form submits:
    - a card is displayed with:
        - 4 divs (title, author, pages, read)
        - 1 remove button


key takeaways:
- making of modal form
- modal animation
- adding of overlay to prevent user input when modal form is open
- capturing user input via modal form without accessing from server
- saving form data to local storage
- manipulating object data in dom