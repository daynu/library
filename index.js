function Book(title, author, pages, read)
{    
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

let addButton = document.getElementById('add')
let modal = document.querySelector('.modal')
let overlay = document.querySelector('.overlay')
let addBook = document.getElementById('addBook')
let author = document.getElementById('author')
let title = document.getElementById('title')
let pages = document.getElementById('pages')
let bookList = document.getElementById('bookList')
let read = document.getElementById('read')
let bookDivs = document.querySelectorAll('.book')
let cancel = document.getElementById('cancel')
let removeAlert = document.querySelector('.removeAlert');
let alertOption = document.querySelectorAll('.alertOption')


let bookArray = []
let key = 'library';



function localStorageCheck()
{
    if(localStorage.getItem(key) == null || localStorage.getItem(key) == [])
    {
        return false
    }
    else
    return true;
}
let removeButtons = document.querySelectorAll('.remove')


if(localStorageCheck())
{
    bookArray = JSON.parse(localStorage.getItem(key))
    renderBooks()
}




addBook.addEventListener('click', ()=>
{
    if(title.value&&author.value&&pages.value)
    {
        let bookTitle = title.value;
        if(checkTitle(bookTitle))
        {
            let bookAuthor = author.value;
            let bookPages = pages.value;
            let bookRead = read.checked;
            let book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
            bookArray.push(book)
            localStorage.setItem(key, JSON.stringify(bookArray))
        }
        else
        {
            alert("A book with this title already exists")
        }

    }

})


addButton.addEventListener('click', ()=>
{
    openModal();
})

const openModal = function()
{
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
    console.log('modal  ')
}

const closeModal = () =>
{
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

function removeBook(title)
{
    bookArray.forEach((book)=>
    {
        if(book.title == title)
        {
            firstArray = bookArray.slice(0, bookArray.indexOf(book));
            secondArray = bookArray.slice(bookArray.indexOf(book)+1);
            bookArray = firstArray.concat(secondArray)
        } 
        localStorage.setItem(key, JSON.stringify(bookArray))
    })
}


function checkTitle(title)
{
    for(let i = 0; i < bookArray.length; i++)
    {
        if(title == bookArray[i].title)
        {
            return false;
        }
    }
    return true;
}


function renderBooks()
{   
    bookArray = JSON.parse(localStorage.getItem(key))
    bookList.innerHTML = '';
    bookArray.forEach((book) =>
    {
        let readStatus;
        if(isBookRead(book.title))
        {
            readStatus = 'READ'     
            bookList.innerHTML += "<div class = 'book'><h3 class = 'bookTitle'>Title: " + book.title + "</h3><br>Author: "
            + book.author + "<br>Pages: " + book.pages + 
            "<br><button class = 'read'>"+ readStatus + "</button><br>"
            + "<button class = 'remove'>REMOVE</button></div>"
        }
        else
        {
            readStatus = 'UNREAD'    
            bookList.innerHTML += "<div class = 'book'><h3 class = 'bookTitle'>Title: " + book.title + "</h3><br>Author: "
            + book.author + "<br>Pages: " + book.pages + 
            "<br><button class = 'read unread'>"+ readStatus + "</button><br>"
            + "<button class = 'remove'>REMOVE</button></div>"
        }
    }
   
    )

    removeButtons = document.querySelectorAll('.remove')
    bookDivs = document.querySelectorAll('.book')
    removeButtonsWork();
    toggleReadBook();
}

console.log(removeButtons)


function removeButtonsWork()
{
    removeButtons.forEach((remove) =>
    {
        remove.addEventListener('click', () =>
        {
            bookDivs.forEach((div) =>
            {
                div.addEventListener('click', () => 
                {   
                                    
                    console.log(div)
                    let divSplit = div.innerHTML.split('</h3>')
                    let title = divSplit[0].slice(29);
                    openRemoveAlert()
                    let decision        
                    alertOption.forEach((option)=>
                        option.addEventListener('click', () =>
                        {
                            decision = option.id;
                            console.log(option.id)
                            if(decision === 'yes')
                            {
                                removeBook(title)
                                
                            }
                            renderBooks()
                            closeRemoveAlert();
                        }))

                    
                  ;
                })

        })

        })
    })

}

cancel.addEventListener('click', () =>
{
    closeModal();
})

function openRemoveAlert()
{
    removeAlert.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeRemoveAlert()
{
    removeAlert.classList.add('hidden');
    overlay.classList.add('hidden');
}

function isBookRead(title)
{

 for(let i = 0; i < bookArray.length; i++)
    {
        if(title == bookArray[i].title)
        {
            return bookArray[i].read;
        }
    }
}


function toggleReadBook()
{
    let readBook = document.querySelectorAll('.read')
    readBook.forEach((button)=>
    {
        let title;
        button.addEventListener('click', () =>
        {
            console.log('click')
            for(let i = 0; i < bookDivs.length; i++)
            {
                bookDivs[i].addEventListener('click', ()=>
                {
                    let divSplit = bookDivs[i].innerHTML.split('</h3>')
                    title = divSplit[0].slice(29);
                    for(let i = 0; i < bookArray.length; i++)
                    {
                        if(title == bookArray[i].title)
                        {
                            bookArray[i].read = !bookArray[i].read
                            localStorage.setItem(key, JSON.stringify(bookArray))
                            renderBooks()
                        }
                    }
                }
                )
            }
        })

        
    })
}

