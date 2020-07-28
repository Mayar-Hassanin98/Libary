//creat a class book
class Book{
    constructor(title,author,pages){
       this.title=title;
       this.author=author;
       this.pages=pages; 
    }
}
//create a class UI :Handle tasks
class UI{
  static displayBooks(){
   
    const books=Storage.getBook();
    books.forEach((book) => UI.addBookToList(book))
  }
  static addBookToList(book){
    const list=document.querySelector("#book-list");
    const row= document.createElement('tr');
    row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
    <td class='read'>readed</td>
    <td class='delete' style="color:red">X</td>`;
    list.appendChild(row);
  }
   
  static clearField(){
      document.querySelector("#title").value='';
      document.querySelector("#author").value='';
      document.querySelector("#pages").value='';
  }

  static deleteBook(book){
      if(book.classList.contains('delete')){
          book.parentElement.remove();
          UI.showAlert("Book removed",'red')
      }
  }
  static toggleRead(book){
      if(book.classList.contains('read')){
          if(book.innerHTML=='readed')
          book.innerHTML= 'not readed yet';
          else 
          book.innerHTML= 'readed';
      }
  }
  static showAlert(message,color){
      const div= document.createElement('div');
      div.className='alert';
      //styling new element 
      div.style.backgroundColor=color;
      div.style.color="white";
      div.style.fontWeight="bold";
      div.style.border="1px solid color";
      div.style.padding="8px 35px 8px 14px"
      div.style.position="relative";
      div.style.width="550px";
      div.style.textAlign="center";
      div.style.margin="20px auto";
      
      div.appendChild(document.createTextNode(message))
     const container=document.querySelector('.container')
     const form=document.querySelector('#book-form')
     container.insertBefore(div,form);
     //Vanish in 3 sec
     setTimeout(()=>document.querySelector('.alert').remove(),3000);
  }
}
// create a storage class
class Storage{
    static getBook(){
    let books;
    if(localStorage.getItem('books')===null){
     books=[];}
     else {
     books=JSON.parse(localStorage.getItem('books'))
    }


     return books;
    }
    static addBook(book){

        const books=Storage.getBook();
        books.push(book);
        localStorage.setItem('books',  JSON.stringify(books))

    }
    static removeBook(pages){
      
        const books=Storage.getBook();
        books.forEach((book,index) => {
            if(book.pages === pages){
             books.splice(index,1)}
        });
        localStorage.setItem('books', JSON.stringify(books))
    }

}
//event for display book
document.addEventListener('DOMContentLoaded',UI.displayBooks)
//event for delete book
document.querySelector("#book-list").addEventListener('click',(e)=>{
    //remove book from UI
    UI.deleteBook(e.target);
    //remove book from storage
    Storage.removeBook(e.target.previousElementSibling.previousElementSibling.textContent)
}  
)
//event for add book
document.querySelector('#book-form').addEventListener('submit',(e) => { 
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const pages=document.querySelector('#pages').value;
    //validate 
    if(title==''|| author ==''||pages == ''){
        UI.showAlert("please fill in all fields",'red');
    }
    else{

        const book= new Book(title,author,pages);
        UI.addBookToList(book);
        //clear textfield
        UI.clearField();
        UI.showAlert("Book added successfully",'green')
        //Add book to storage
        Storage.addBook(book)
   
    }
   
})

//event for toggle reading of a book
document.querySelector("#book-list").addEventListener('click',(e)=>{
    UI.toggleRead(e.target);
}
)

