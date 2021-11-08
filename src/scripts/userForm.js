import { sendLetters } from "./dataAccess.js"
import { getAuthors, getTopics, getRecipients } from "./dataAccess.js"
import { setAuthor, setTopic, setRecipient } from "./dataAccess.js"
import { getTransientState } from "./dataAccess.js"

// This module creates the HTML that is displayed automatically when the page is loaded.

const mainContainer = document.querySelector("#container")



export const UserForm = () => {
    // Puts data into variables
    const authors = getAuthors()
    const topics = getTopics()
    const recipients = getRecipients()

    // Create a HTML varible that will hold all the HTML
    let html = `
        <div class="field">
            <label class="label" for="author">Choose Author</label>
            <select name="author" id="author"> 
            <option/>Choose Author...</option>`

    // Loop through each author in the authors table        
    for (const author of authors) {
        html += `<option value="${author.id}">${author.name}</option>`
    }

    html += `</select></div>`

    html += `       
        <div class="field">
            <label class="label" for="letter">Letter</label>
            <textarea name="letter" class="input"></textarea>
        </div> `

    html += `<div class="radio">`

    // Loop through each topic in the topics table
    for (const topic of topics) {
        html += `<input type="checkbox" value="${topic.id}" name="topic" id="${topic.id}"> ${topic.name}`
    }

    html += "</div>"

    html += `<div class="field">
            <label class="label" for="recipient">Recipient</label>
            <select name="recipient" id="recipient">
            <option/>Choose Recipients...</option>`

    // Loop through each recipient in the recipients table
    for (const recipient of recipients) {
        html += `<option value="${recipient.id}">${recipient.name}</option>`

    }

    html += ` </select>
            </div>`

    html += `<button class="button" id="submitRequest">Send Letter</button>`

    return html
}


// Event Listeners

// Listens for a change to be made. If the change is made at the author html then it sets the value to the transient table. 
document.addEventListener(
    "change",
    (event) => {
        // if the change happens where the name is author
        if (event.target.name === "author") {
            // set the author id to the transient table
            setAuthor(parseInt(event.target.value))
        }
    }
)

document.addEventListener(
    "click",
    evt => {
        // if the click happens where the type is a checkbox
        if (evt.target.type === "checkbox") {
            const topic = evt.target.value
            // Set the topic to the transient.topicIds
            setTopic(parseInt(topic))
        }
    }
)


document.addEventListener(
    "change",
    (event) => {
        // if the change happens where the name is recipient
        if (event.target.name === "recipient") {
            // set the recipient id to the recipient table
            setRecipient(parseInt(event.target.value))
        }
    }
)

// Listen for the Click
mainContainer.addEventListener("click", clickEvent => {
    // Looks to see if the submit button is clicked
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const transient = getTransientState()
        const userAuthor = transient.authorId
        const userLetter = document.querySelector("textarea[name='letter']").value
        const userRecipient = transient.recipientId


        // Make an object out of the user input
        const dataToSendToAPI = {
            author: userAuthor,
            letter: userLetter,
            recipient: userRecipient,
        }

        // Send the data to the API for permanent storage
        sendLetters(dataToSendToAPI)
    }
})