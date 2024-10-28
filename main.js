//local storage
let notes= []
if(localStorage){
  notes=JSON.parse(localStorage.getItem("notes"))
}
//    notes = [
//   {title: "test", content: "hello!", metadata: {id: 1},date:"11.1.2023"},
//   {title: "test", content: "hello world!", metadata: {id: 2},date:"12.12.2020"},
//   {title: "test", content: "hello!", metadata: {id: 3},date:"11.1.2023"}
// ]
localStorage.setItem("notes",JSON.stringify(notes))




let selectedNote = undefined

const list = document.getElementById("list")

const main = document.getElementById("main")
const title = document.getElementsByClassName("title")[0]
const displayDate = document.getElementsByClassName("displayDate")[0]
const content = document.getElementsByClassName("content")[0]



function addNote(data) {
  let item = document.createElement("div")
  item.id = data.metadata.id
  item.date=data.date
  item.classList = "listItem"
  item.innerText = data.title

  if(data.metadata?.color)
    item.style.backgroundColor = data.metadata.color

  item.addEventListener("click",
    function (event) {
      selectedNote = event.target
      const listNote = notes.find(function (note) {return note.metadata.id == selectedNote.id})
      title.innerText  = listNote.title
      displayDate.innerText = listNote.date
      content.innerText =listNote.content
      main.style.backgroundColor = listNote.metadata?.color ?? "white"
    })
  list.appendChild(item)
}



function removeNote() {
  const noteIndex = notes.findIndex(function (note) {return note.metadata.id === selectedNote.id})
  notes.splice(noteIndex, 1)
  selectedNote.remove()
  console.log(notes)
  localStorage.setItem("notes",JSON.stringify(notes))
  title.innerText   = ""
  content.innerText = ""
  displayDate.innerText = ""

}


for(const note of notes) {
  addNote(note)
}


const dialog       = document.getElementById("dialog")
const dialogButton = document.getElementById("dialogSubmit")

dialogButton.onclick = function () {
  switch(action) {
    case "add":
          let idNote=notes.length+1
          let newNote = {}
          newNote.title   = dialog.children[0].value
          newNote.content = dialog.children[1].value
          newNote.metadata = {id: performance.now()}
          newNote.date = new Date().toLocaleDateString();
          
          
          notes.push(newNote)
          localStorage.setItem("notes", JSON.stringify(notes))
          addNote(newNote)
          dialog.close()
          break;
    case "edit":
          selectedNote.innerText = dialog.children[0].value
          title.innerText        = dialog.children[0].value
          content.innerText      = dialog.children[1].value
          const listNote = notes.find(function (note) {return note.metadata.id == selectedNote.id})
          listNote.title         = dialog.children[0].value
          listNote.content       = dialog.children[1].value
          localStorage.setItem("notes", JSON.stringify(notes))
          dialog.close()
          break;
    default:
          alert("I do not know what to do!")
          dialog.close()
  }
}



const [buttonAdd, buttonRemove, buttonEdit] = document.getElementsByClassName("action")
let action


buttonAdd.onclick = function () {
  action = "add"
  dialog.children[0].value = ""
  dialog.children[1].value = ""
  dialogButton.innerText = "הוספה"
  dialog.showModal()
}

buttonRemove.onclick = function () {
  removeNote()
}

buttonEdit.onclick = function () {
  action = "edit"
  dialog.children[0].value = title.innerText
  dialog.children[1].value = content.innerText
  dialogButton.innerText = "עדכון"
  dialog.showModal()
}


  let keepselectedDate=undefined
//filter notes by date
selectDateButton.onclick=function (){

  let ElementselectedDate = document.getElementById("date");
  let selectedDate =ElementselectedDate.value
  
  list.innerHTML = "";
  content.innerText = "";
  title.innerText = "";
  displayDate.innerText = "";
  
  if(selectedDate && selectedDate!==keepselectedDate){
    keepselectedDate=selectedDate
    var date = new Date(selectedDate).toLocaleDateString();
       const filterNotes = notes.filter(item => {
       return item.date=== date; })
    filterNotes.forEach((note) => addNote(note)); 
  }
  else {
    keepselectedDate=undefined
    ElementselectedDate.value=""
    notes.forEach((note) => addNote(note)); 
  } 
 }

 let keepSearchText=undefined

 //filter search text
 searchTextButton.onclick=function (){
  list.innerHTML = "";
  content.innerText = "";
  title.innerText = "";
  displayDate.innerText = "";
  let ElementSearchText= document.getElementById("searchText");
  let searchText =ElementSearchText.value
  
  
  if(searchText && searchText!==keepSearchText){
    keepSearchText=searchText
    debugger
       const filterNotes = notes.filter(note => {
       return note.title.includes(searchText)|| note.content.includes(searchText);
      })
    filterNotes.forEach((note) => addNote(note)); 
  }
  else {
    keepSearchText=undefined
    ElementSearchText.value=""
    notes.forEach((note) => addNote(note)); 
  } 
 }

