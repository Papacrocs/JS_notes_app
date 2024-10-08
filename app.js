
const notesContainer = document.querySelector(".notes-container"); // Container for notes
const createBtn = document.querySelector(".btn"); // Button to create new notes

// Function to display saved notes from localStorage
function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes") || ""; // Display saved notes or empty if none
}
showNotes(); // Call the function to load notes on page load

// Function to update localStorage with the current state of notes
function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML); // Save the current notesContainer HTML to localStorage
}

// Event listener for the "Create Notes" button
createBtn.addEventListener("click", () => {
    let noteDiv = document.createElement("div"); // Create a container div for the note
    noteDiv.className = "note-div";

    let inputBox = document.createElement("p"); // Create a new paragraph element for the note text
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true"); // Make the paragraph editable

    let i = document.createElement("i"); // Create an icon element for the trash icon
    i.className = "fa fa-trash";
    i.style.cursor = "pointer"; // Make the trash icon look clickable

    // Append the inputBox and the trash icon to the note container div
    noteDiv.appendChild(inputBox);
    noteDiv.appendChild(i);

    // Append the note container div to the notes container
    notesContainer.appendChild(noteDiv);

    // Focus on the new input box to immediately start typing
    inputBox.focus();

    // Add a keyup event listener to save changes as the user types
    inputBox.addEventListener("keyup", updateStorage);
});

// Event listener for the notesContainer to handle clicks on the trash icon
notesContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("fa-trash")){ // Check if the clicked element is the trash icon
        e.target.parentElement.remove(); // Remove the entire note container div
        updateStorage(); // Update localStorage
    }
});

// Prevent "Enter" key from creating a new paragraph, instead, insert a line break
document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak"); // Insert a line break instead of creating a new paragraph
        event.preventDefault(); // Prevent the default behavior of the "Enter" key
    }
});

